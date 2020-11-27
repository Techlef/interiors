using AltV.Net;
using AltV.Net.Data;
using AltV.Net.Elements.Entities;
using AltV.Net.Enums;
using AltV.Net.Resources.Chat.Api;
using System;

namespace modding.server.commands
{
    public class Commands : IScript
    {
        [Command("veh", false, null)]
        public void CreateVehicle(IPlayer player, string VehicleName, int R = 0, int G = 0, int B = 0)
        {
            if (Alt.CreateVehicle(Alt.Hash(VehicleName), new Position(player.Position.X, player.Position.Y + 1.5f, player.Position.Z), player.Rotation) == null)
                return;
            player.SendChatMessage("You just Created a " + VehicleName);
        }

        [Command("weapon", false, null)]
        public void GiveWeapon(IPlayer player, WeaponModel weaponName)
        {
            Console.WriteLine("Command is working");
            player.GiveWeapon(weaponName, 200, true);
        }

        [Command("modweapon", false, null)]
        public void GiveModWeapon(IPlayer player, string weaponname) => player.GiveWeapon(Alt.Hash(weaponname), 200, true);

        [Command("setweather", false, null)]
        public void SetWeather(IPlayer player, WeatherType unit)
        {
            Console.WriteLine("Command is working");
            player.SetWeather(unit);
            player.SendChatMessage("you changed the Weather to " + unit.ToString());
        }

        [Command("tp", false, null)]
        public void TeleportToCoordinates(IPlayer player, float x, float y, float z)
        {
            Position position = new Position(x, y, z);
            player.SetPosition(x, y, z);
        }

        [Command("settime", false, null)]
        public void SetTime(
          IPlayer player,
          int day,
          int month,
          int year,
          int hour,
          int minute,
          int second) => player.SetDateTime(day, month, year, hour, minute, second);

        [Command("setplayerped", false, null)]
        public void SetPlayerPed(IPlayer player, string pedname) => player.Model = Alt.Hash(pedname);
    }
}