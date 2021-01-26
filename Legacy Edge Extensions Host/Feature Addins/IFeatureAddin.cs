using Legacy_Edge_Extensions_Host.SDK;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.ApplicationModel.AppService;

namespace Legacy_Edge_Extensions_Host.Feature_Addins
{
    interface IFeatureAddin
    {
        void Register(EdgeConnection connection);
        void Unregister();

        // https://www.quarks.de/gesundheit/medizin/corona-test-wie-funktioniert-der-test/#:~:text=Leuchtende%20Gene%20als%20Erkennungsmerkmal

    }
}
