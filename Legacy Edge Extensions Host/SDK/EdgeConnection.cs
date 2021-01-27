using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.ApplicationModel.AppService;
using Windows.ApplicationModel.Background;
using Windows.ApplicationModel.DataTransfer;
using Windows.Foundation.Collections;

namespace Legacy_Edge_Extensions_Host.SDK
{
    public class EdgeConnection
    {
        public AppServiceConnection BaseConnection { get => AppService.AppServiceConnection; }
        public AppServiceTriggerDetails AppService { get; private set; }

        private BackgroundTaskDeferral appServiceDeferral;

        public EdgeConnection(BackgroundTaskDeferral deferral, AppServiceTriggerDetails appService)
        {
            this.AppService = appService;
            this.appServiceDeferral = deferral;
            BaseConnection.RequestReceived += Connection_RequestReceived;
            BaseConnection.ServiceClosed += Connection_ServiceClosed;
        }

        #region Communication
        private Dictionary<Guid, TaskCompletionSource<JToken>> RunningTasks = new Dictionary<Guid, TaskCompletionSource<JToken>>();

        private async void Connection_RequestReceived(AppServiceConnection sender, AppServiceRequestReceivedEventArgs args)
        {
            AppServiceDeferral messageDeferral = args.GetDeferral();

            var msg = args.Request.Message.First().Value.ToString().Trim('"').Replace("\\\"", "\"");
            try
            {
                JToken data = (JToken)JsonConvert.DeserializeObject(msg);
                if (data["type"] != null)
                {
                    var guid = new Guid(data["guid"].ToString());
                    var task = RunningTasks[guid];
                    RunningTasks.Remove(guid);
                    switch (data["type"].ToString())
                    {
                        case "method_call_response":
                            task.SetResult(data["result"]);
                            break;
                        case "exception":
                            task.SetException(new JSException(data["exception"]));
                            break;
                    }
                }
            }
            catch (Exception)
            {

            }
            if(msg == "test")
            {
                test();
            }
            messageDeferral.Complete();
        }

        async void test()
        {
            //DataTransferManager dataTransferManager = DataTransferManager.GetForCurrentView();
            //DataTransferManager.ShowShareUI();
            //return;
            try
            {
                var xyz = await ExecuteJSFunction("return document.body");
            }
            catch (Exception ex)
            {
                Debugger.Break();
            }
            
        }

        ValueSet GenerateMessage(string msg)
        {
            ValueSet data = new ValueSet();
            data.Add("", msg);
            return data;
        }

        private void Connection_ServiceClosed(AppServiceConnection sender, AppServiceClosedEventArgs args)
        {
            this.appServiceDeferral.Complete();
        }
        #endregion

        public Task<JToken> ExecuteJSFunction(string[] codeLines)
        {
            return ExecuteJSFunction(string.Join("; ", codeLines));
        }

        public Task<JToken> ExecuteJSFunction(string code)
        {
            var promise = new TaskCompletionSource<JToken>();
            Guid guid = Guid.NewGuid();
            RunningTasks.Add(guid, promise);
            var request = new JObject();
            request["type"] = "method_call";
            request["guid"] = guid.ToString();
            request["code"] = code;
            BaseConnection.SendMessageAsync(GenerateMessage(JsonConvert.SerializeObject(request)));
            return promise.Task;
        }

    }
}
