import ClockDemo from './clockDemo';

function App() {

  return (
    <div className="App">
      {/* <div id="analogClock"></div> */}
      <ClockDemo />
      {/* <div style={{backgroundColor: "lightGrey"}}><Clock secondsHandVisible = {showSeconds} /></div>
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "20px",
      }}>
        <label htmlFor="secondsVisibilityCheckbox">Seconds Indicator Visible</label>
        <input id="secondsVisibilityCheckbox" type="checkbox" defaultChecked={showSeconds} onChange={alterSecondVisibility} />
      </div> */}
    </div>

  );
}
export default App;
