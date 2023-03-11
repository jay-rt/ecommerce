import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

export const widgetData = {
  user: {
    title: "USERS",
    isMoney: false,
    link: "View all users",
    icon: <PersonOutlinedIcon className="icon user-icon__widget" />,
  },
  order: {
    title: "ORDERS",
    isMoney: false,
    link: "View all orders",
    icon: <ShoppingCartOutlinedIcon className="icon order-icon__widget" />,
  },
  earning: {
    title: "EARNINGS",
    isMoney: true,
    link: "View net earnings",
    icon: <MonetizationOnOutlinedIcon className="icon earning-icon__widget" />,
  },
  balance: {
    title: "BALANCE",
    isMoney: true,
    link: "View details",
    icon: (
      <AccountBalanceWalletOutlinedIcon className="icon balance-icon__widget" />
    ),
  },
};
