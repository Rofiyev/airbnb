import { TbBeach, TbPool } from "react-icons/tb";
import {
  GiWindmill,
  GiIsland,
  GiBoatFishing,
  GiCastle,
  GiForestCamp,
  GiCaveEntrance,
  GiCactus,
  GiBarn,
  GiPalmTree,
  GiSailboat,
  GiGolfTee,
} from "react-icons/gi";
import { IoDiamond, IoEarthOutline, IoHomeOutline } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { TbMountain } from "react-icons/tb";
import { FaSkiing, FaFireAlt } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { BiLandscape } from "react-icons/bi";
import { IoIosBaseball } from "react-icons/io";
import { PiFarm } from "react-icons/pi";
import { TCategory, TMenuItem } from "@/types";
import { GrFavorite } from "react-icons/gr";
import { CiCircleList, CiMoneyCheck1 } from "react-icons/ci";

export const categories: TCategory[] = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This properrty is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This properrty has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This properrty is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This properrty is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This properrty has a pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This properrty is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This properrty is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This properrty has skiing activities!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This properrty is in a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This properrty has camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This properrty has camping activities!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This properrty is in a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This properrty is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This properrty is in the barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This properrty is luxurious!",
  },
  {
    label: "Tropical",
    icon: GiPalmTree,
    description: "This properrty is in the tropical!",
  },
  {
    label: "Amazing",
    icon: BiLandscape,
    description: "This properrty is in the cities!",
  },
  {
    label: "Trending",
    icon: FaFireAlt,
    description: "This properrty is in the all cities!",
  },
  {
    label: "Boats",
    icon: GiSailboat,
    description: "This properrty is in the river!",
  },
  {
    label: "Play",
    icon: IoIosBaseball,
    description: "This properrty is in the all cities!",
  },
  {
    label: "Farms",
    icon: PiFarm,
    description: "This properrty is in the village!",
  },
  {
    label: "Golf",
    icon: GiGolfTee,
    description: "This properrty is in the village!",
  },
];

export const menuItems: TMenuItem[] = [
  {
    label: "My trips",
    route: "/trips",
    icon: IoEarthOutline,
  },
  {
    label: "My favourites",
    route: "/favourites",
    icon: GrFavorite,
  },
  {
    label: "My reservations",
    route: "/reservations",
    icon: CiMoneyCheck1,
  },
  {
    label: "My properties",
    route: "/properties",
    icon: CiCircleList,
  },
];
