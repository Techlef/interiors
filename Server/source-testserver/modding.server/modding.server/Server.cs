using AltV.Net;
using System;

namespace modding.resource
{
    public class Server : Resource
    {
        public override void OnStart()
        {
            Console.BackgroundColor = ConsoleColor.Green;
            Console.ForegroundColor = ConsoleColor.Black;
            Console.WriteLine("Started, Good Morning Sunshine...............");
        }

        public override void OnStop()
        {
            Console.BackgroundColor = ConsoleColor.Red;
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("............Stopped, Goodbye your little Asshole");
        }
    }
}

