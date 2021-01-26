using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Legacy_Edge_Extensions_Host.SDK
{
    public class JSException : Exception
    {
        public JSException(JToken JSExceptionData) : base(JSExceptionData["message"].ToString())
        {
            this.JSExceptionData = JSExceptionData;
        }
        public JToken JSExceptionData { get; private set; }
    }
}
