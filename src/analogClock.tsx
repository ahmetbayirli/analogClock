import React from "react";
import "./analogClock.css";

type ClockProps = {
  secondsHandVisible: boolean,
}
type ClockState = { date: Date, secondsHandVisible: boolean };

export default class Clock extends React.Component<ClockProps, ClockState> {
  constructor(props: ClockProps) {
    super(props);
    this.state = {
      date: new Date(),
      secondsHandVisible: props.secondsHandVisible,
    };
  }
  static defaultProps = {
    secondsHandVisible: true,
  };

  timer: any;
  secondsHandVisible: boolean = true;

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidUpdate() {
    this.secondsHandVisible = this.props.secondsHandVisible;
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    // https://en.wikipedia.org/wiki/Clock_angle_problem
    // at 5:24
    // hours hand degree = (60x5+24) x 0.5 = 162 degree
    // minutes hand degree = (6 x 24) = 144 degree
    // minutes hand movement is smooth if seconds hand is visible
    const hoursHandRotation =
      (60 * this.state.date.getHours() + this.state.date.getMinutes()) * 0.5;

    const minutesHandRotation =
      this.state.date.getMinutes() * 6 +
      (this.secondsHandVisible ? this.state.date.getSeconds() / 10 : 0);

    const secondsHandRotation = this.state.date.getSeconds() * 6;

    const hoursHandCss = {
      transform: "rotateZ(" + hoursHandRotation + "deg)",
    };

    const minutesHandCss = {
      transform: "rotateZ(" + minutesHandRotation + "deg)",
    };

    const secondsHandCss = {
      transform: "rotateZ(" + secondsHandRotation + "deg)",
    };

    //getHours return between 0-23
    // 8:00 AM when the day time starts, 17:00 when night time starts
    const isNightTime =
      this.state.date.getHours() < 8 || this.state.date.getHours() >= 17;

    return (
      <div>
        <div
          className={
            "clock-body frame " + (isNightTime ? "dark-bg" : "light-bg")
          }
        >
          <div id="clock" className="clock-face">
            {getClockFace(isNightTime)}
            <div
              id="hoursHand"
              className={
                "hands hours " +
                (this.state.date.getHours() === 0 ? "" : "transition-effect ") +
                (isNightTime ? "light-bg" : "dark-bg")
              }
              style={hoursHandCss}
            ></div>
            <div
              id="minutesHand"
              className={
                "hands minutes " +
                (this.state.date.getMinutes() === 0
                  ? ""
                  : "transition-effect ") +
                (isNightTime ? "light-bg" : "dark-bg")
              }
              style={minutesHandCss}
            ></div>
            <div
              id="secondsHand"
              className={
                "hands seconds " +
                (this.state.date.getSeconds() === 0
                  ? ""
                  : "transition-effect ") +
                (this.secondsHandVisible === true ? "" : "indicator-invisible")
              }
              style={secondsHandCss}
            ></div>
            <div
              className={
                "hands-center " + (isNightTime ? "light-bg" : "dark-bg")
              }
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

function getClockFace(isNightTime: boolean) {
  const numbersClassName = isNightTime ? "numbers-light" : "numbers-dark";
  return (
    <svg
      className="numbers-wrapper"
      width="1e3"
      height="1e3"
      version="1.1"
      viewBox="0 0 1e3 1e3"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g strokeWidth="3.1015">
        <g
          transform="scale(.92894 1.0765)"
          aria-label="11"
          className={numbersClassName}
        >
          <path d="m273.21 150.65h-11.041v-69.224q-8.56 8.3119-21.834 13.274v-10.669q19.105-8.6841 25.68-22.206h7.1954z" />
          <path d="m342.19 150.65h-11.041v-69.224q-8.56 8.3119-21.834 13.274v-10.669q19.105-8.6841 25.68-22.206h7.1954z" />
        </g>
        <g
          transform="scale(.92894 1.0765)"
          aria-label="10"
          className={numbersClassName}
        >
          <path d="m70.849 301.7h-11.041v-69.224q-8.56 8.3119-21.834 13.274v-10.669q19.105-8.6841 25.68-22.206h7.1954z" />
          <path d="m98.514 257.29q0-46.15 29.154-46.15 28.906 0 28.906 46.15 0 45.901-28.906 45.901-29.154 0-29.154-45.901zm11.041 0q0 36.969 18.112 36.969 17.864 0 17.864-36.969 0-37.217-18.112-37.217-17.864 0-17.864 37.217z" />
        </g>
        <g
          transform="scale(.92894 1.0765)"
          aria-label="9"
          className={numbersClassName}
        >
          <path d="m26.424 477.49q-11.661 0-19.105-8.1878-7.3194-8.3119-7.3194-21.09 0-13.15 7.4435-21.71 7.5675-8.56 20.594-8.56 30.394 0 30.394 43.792 0 48.259-31.759 48.259-10.421 0-16.996-5.9548-6.5751-5.9548-7.9397-16.5l10.421-0.86841q2.7293 14.391 14.763 14.391 6.0788 0 10.421-3.3496 4.342-3.4736 6.327-8.56 1.9849-5.2104 2.8533-9.4284 0.86841-4.342 0.86841-7.8156v-5.8307q-7.1954 11.413-20.966 11.413zm2.7293-8.9322q7.9397 0 12.53-5.9548 4.7142-6.0788 4.7142-14.763 0-8.8081-4.7142-14.887-4.5901-6.0788-12.406-6.0788t-13.026 6.327q-5.2104 6.327-5.2104 15.383 0 8.9322 5.3345 14.515 5.3345 5.4586 12.778 5.4586z" />
        </g>
        <g
          transform="scale(.92894 1.0765)"
          aria-label="8"
          className={numbersClassName}
        >
          <path d="m96.91 721.58q-12.902 0-21.09-7.6916-8.0638-7.6916-8.0638-19.849 0-18.361 16.748-22.703-13.15-5.0864-13.15-18.609 0-9.4284 6.5751-16.252 6.6991-6.9472 18.981-6.9472 11.661 0 18.609 6.6991 6.9472 6.5751 6.9472 16.872 0 13.274-12.778 18.237 16.5 5.3345 16.5 22.951 0 12.406-8.4359 19.849-8.3119 7.4435-20.842 7.4435zm0-83.119q-5.4586 0-10.049 3.7217-4.4661 3.5977-4.4661 10.173 0 6.451 3.9699 10.545 4.0939 4.0939 10.669 4.0939 6.451 0 10.421-3.8458 3.9699-3.9699 3.9699-10.173 0-6.451-4.218-10.421-4.218-4.0939-10.297-4.0939zm-0.24812 37.466q-7.8157 0-12.902 5.4586-4.9623 5.3345-4.9623 12.654 0 8.56 5.3345 13.646 5.4586 4.9623 12.902 4.9623 8.0638 0 13.026-5.0864 5.0864-5.2104 5.0864-13.15 0-8.0638-5.3345-13.274-5.2104-5.2104-13.15-5.2104z" />
        </g>
        <g
          transform="scale(.92894 1.0765)"
          aria-label="7"
          className={numbersClassName}
        >
          <path d="m265.06 871.5q0.62029-21.338 9.9246-43.917 9.3044-22.579 21.338-35.977h-43.544v-8.9322h57.315v6.8232q-12.53 13.398-22.454 36.101-9.8006 22.579-11.289 45.901z" />
        </g>
        <g
          transform="scale(.92894 1.0765)"
          aria-label="6"
          className={numbersClassName}
        >
          <path d="m570.99 898.18q0 13.646-7.5675 22.206-7.5675 8.56-19.973 8.56-31.014 0-31.014-43.792 0-48.259 31.883-48.259 21.71 0 25.308 22.454l-10.793 0.74435q-3.2255-14.267-15.259-14.267-7.0713 0-11.786 5.0864-4.5901 5.0864-6.451 12.654-1.8609 7.5675-1.8609 17.492 7.1954-11.413 21.462-11.413 11.661 0 18.857 8.0638 7.1954 8.0638 7.1954 20.47zm-28.161-19.601q-5.0864 0-8.8081 2.109-3.7217 2.109-5.5826 5.3345-1.7368 3.2255-2.6052 6.327t-0.86841 6.0788q0 9.1803 5.0864 15.383t13.15 6.2029q7.6916 0 12.158-5.9548 4.5902-6.0788 4.5902-15.135 0-10.669-5.2104-15.507-5.2104-4.8383-11.91-4.8383z" />
        </g>
        <g
          transform="scale(.92894 1.0765)"
          aria-label="5"
          className={numbersClassName}
        >
          <path d="m815.36 841.84q0-3.4736-0.8684-6.8232-0.86841-3.3496-2.8533-6.5751-1.9849-3.3496-5.9548-5.3345-3.9698-1.9849-9.3044-1.9849-10.173 0-16.252 8.9322l-10.173-1.3646 8.6841-46.274h44.165v8.9322h-35.357l-4.8383 26.176q7.4435-5.3345 16.624-5.3345 12.778 0 19.973 8.0638 7.1954 8.0638 7.1954 20.718 0 13.646-8.0638 22.703-8.0638 9.0562-21.834 9.0562-12.034 0-19.725-6.5751-7.5675-6.5751-8.8081-18.361l11.413-0.74435q2.6052 16.748 17.12 16.748 8.0638 0 13.398-5.9548 5.4586-6.0788 5.4586-16.003z" />
        </g>
        <g
          transform="scale(.92894 1.0765)"
          aria-label="4"
          className={numbersClassName}
        >
          <path d="m999.76 719.61v-22.454h-38.582v-8.9322l40.691-57.439h8.9321v57.439h12.034v8.9322h-12.034v22.454zm0-31.387v-39.947l-27.665 39.947z" />
        </g>
        <g
          transform="scale(.92894 1.0765)"
          aria-label="3"
          className={numbersClassName}
        >
          <path d="m1076.5 483.33q0 13.026-8.436 20.594-8.3119 7.5675-20.842 7.5675-12.53 0-19.849-6.9472-7.1954-7.0713-8.56-18.485l11.041-1.3646q3.5976 17.864 17.368 17.864 8.0638 0 13.15-5.4586 5.0864-5.4586 5.0864-13.522 0-7.8156-4.8383-12.654-4.7142-4.8383-12.53-4.8383-2.3571 0-7.5675 1.2406l1.1165-9.4284h2.7292q7.1954 0 12.158-4.218 4.9624-4.342 4.9624-11.041 0-6.451-4.218-10.297-4.0939-3.9698-10.297-3.9698-13.522 0-16.128 16.376l-10.793-1.8609q4.342-23.447 26.796-23.447 11.662 0 18.609 6.6991 7.0713 6.5751 7.0713 16.748 0 12.778-12.406 18.361 16.376 3.7217 16.376 22.082z" />
        </g>
        <g
          transform="scale(.92894 1.0765)"
          aria-label="2"
          className={numbersClassName}
        >
          <path d="m1015.2 240.32q0 6.5751-3.7217 13.274-3.5977 6.6991-9.4284 12.53-5.7067 5.7067-11.661 10.917-5.9548 5.0864-11.786 10.545-5.8307 5.4586-8.3119 9.6765h44.909v8.9322h-58.679q0-5.0864 2.7293-10.545 2.8533-5.5826 7.4435-10.545t8.9322-8.9322q4.4661-4.0939 9.1803-8.0638 4.7142-3.9698 6.327-5.7067 13.026-13.522 13.026-22.454 0-6.8232-4.8383-11.041-4.8383-4.342-12.034-4.342-8.0638 0-12.778 4.8383-4.7142 4.7142-4.7142 13.026l-11.289-1.1165q2.4812-25.68 28.906-25.68 12.406 0 20.097 6.6991 7.6915 6.6991 7.6915 17.988z" />
        </g>
        <g
          transform="scale(.92894 1.0765)"
          aria-label="1"
          className={numbersClassName}
        >
          <path d="m809.43 151.46h-11.041v-69.224q-8.56 8.3119-21.834 13.274v-10.669q19.105-8.6841 25.68-22.206h7.1954z" />
        </g>
        <g
          transform="scale(.92894 1.0765)"
          aria-label="12"
          className={numbersClassName}
        >
          <path d="m516.82 90.563h-11.041v-69.224q-8.56 8.3119-21.834 13.274v-10.669q19.105-8.6841 25.68-22.206h7.1954z" />
          <path d="m601.56 24.688q0 6.5751-3.7217 13.274-3.5977 6.6991-9.4284 12.53-5.7067 5.7067-11.661 10.917-5.9548 5.0864-11.786 10.545t-8.3119 9.6765h44.909v8.9322h-58.679q0-5.0864 2.7293-10.545 2.8533-5.5826 7.4435-10.545 4.5902-4.9623 8.9322-8.9322 4.4661-4.0939 9.1803-8.0638t6.327-5.7067q13.026-13.522 13.026-22.454 0-6.8232-4.8383-11.041-4.8383-4.342-12.034-4.342-8.0638 0-12.778 4.8383-4.7142 4.7142-4.7142 13.026l-11.289-1.1165q2.4812-25.68 28.906-25.68 12.406 0 20.097 6.6991 7.6916 6.6991 7.6916 17.988z" />
        </g>
      </g>
    </svg>
  );
}
