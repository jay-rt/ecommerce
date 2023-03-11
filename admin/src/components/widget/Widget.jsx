import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import "./widget.scss";

const Widget = ({ data, current, previous }) => {
  //for temporary purpose
  const amount = 100;
  const diff = 20;

  const percentage = current
    ? previous !== 0
      ? ((current - previous) / previous) * 100
      : 100
    : diff;

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {current ? current : amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div
          className={
            percentage > 0 ? "percentage positive" : "percentage negative"
          }
        >
          {percentage > 0 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDown />}
          {percentage} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
