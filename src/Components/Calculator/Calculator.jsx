import React, { useEffect, useState } from "react";
import "./Calculator.css";
import uniqid from "uniqid";
import { useRef } from "react";
import { useCallback } from "react";

function Calculator() {
  const ref1 = useRef();
  const ref2 = useRef();
  var values;
  var icons;
  var calc;

  const digits = [];
  var opMark;
  var historyForm = {};
  var inputForm = {};
  const ops = ["/", "x", "+", "-", "."];
  var [windowSize, setwindowSize] = useState(undefined);
  const [val, setVal] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [inpValue, setInpValue] = useState([]);
  const [resultCond, setResultCond] = useState(false);

  const clickDigits = (e) => {
    if (
      (ops.includes(e) && val === "") ||
      (ops.includes(e) && ops.includes(val.toString().slice(-1)))
    ) {
      return;
    }

    setVal(val + e);

    if (!ops.includes(e)) {
      if (val.includes("x")) {
        let value = [];
        for (let i = 0; i < val.length; i++) {
          if (val[i] === "x") {
            opMark = val[i].replaceAll("x", "*");
            value.push(opMark);
          } else {
            value.push(val[i]);
          }
        }
        value = value.join("");

        setResult(eval(value + e));
      } else {
        /* eslint no-eval: 0 */
        setResult(eval(val + e));
      }
    }
  };

  const deleteClick = async () => {
    if (val === "") {
      return;
    } else if (resultCond) {
      setVal("");
      setResult("");
    } else {
      setVal(val.slice(0, -1));
    }
  };

  const equalClick = () => {
    setResultCond(true);
    setVal(result);
    historyForm = {
      v: val,
      r: result,
    };
    inputForm = {
      v: val,
    };
    setInpValue([...inpValue, inputForm]);
    setHistory([...history, historyForm]);
  };

  const displayDigits = () => {
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button key={i} onClick={() => clickDigits(i.toString())}>
          {i}
        </button>
      );
    }
    return digits;
  };

  const resetResult = () => {
    setVal("");
    setResult("");
  };

  const resetHistory = () => {
    setResultCond(false);
    setVal("");
    setResult("");
    setHistory([]);
    setInpValue([]);
  };

  const editValue = async (index) => {
    history[index].v = inpValue[index].v;
    if (inpValue[index].v.includes("x")) {
      history[index].r = eval(inpValue[index].v.replaceAll("x", "*"));
    } else {
      history[index].r = eval(inpValue[index].v);
    }
    setHistory([...history]);

    values.forEach((v, i) => {
      if (i === index) {
        v.classList.remove("activeInp");
      } else {
        return;
      }
    });

    icons.forEach((ic, i) => {
      if (i === index) {
        ic.classList.remove("hideI");
      } else {
        return;
      }
    });
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    inpValue[i][name] = value;
    setInpValue([...inpValue]);
  };

  const switchEdit = (ind) => {
    icons.forEach((ic, i) => {
      if (i === ind) {
        ic.classList.add("hideI");
      } else {
        ic.classList.remove("hideI");
      }
    });

    values.forEach((v, i) => {
      if (i === ind) {
        v.classList.add("activeInp");
      } else {
        v.classList.remove("activeInp");
      }
    });
  };

  const handleWindowSize = useCallback((e) => {
    setwindowSize(window.innerWidth);
  }, []);

  useEffect(() => {
    icons = document.querySelectorAll(".icon");
    values = document.querySelectorAll(".inp");
    window.addEventListener("resize", handleWindowSize);

    if (window.innerWidth !== windowSize) {
      if (ref1.current.classList.contains("activeHistory")) {
        if (window.innerWidth >= 768) {
          ref1.current.style.height = ref2.current.offsetHeight + "px";
          if (window.innerWidth < 1440) {
            ref1.current.style.width = "30%";
          } else {
            ref1.current.style.width = "20%";
          }
        } else {
          ref1.current.style.width = "90%";
          ref1.current.style.height = "80px";
        }
      } else {
        if (window.innerWidth >= 768) {
          ref1.current.style.height = ref2.current.offsetHeight + "px";
          ref1.current.style.width = "0";
        } else {
          ref1.current.style.width = "90%";
          ref1.current.style.height = "0";
        }
      }
    } else {
      if (ref1.current.classList.contains("activeHistory")) {
        if (window.innerWidth >= 768) {
          ref1.current.style.height = ref2.current.offsetHeight + "px";
          if (window.innerWidth < 1440) {
            ref1.current.style.width = "30%";
          } else {
            ref1.current.style.width = "20%";
          }
        } else {
          ref1.current.style.width = "90%";
          ref1.current.style.height = "80px";
        }
      } else {
        if (window.innerWidth >= 768) {
          ref1.current.style.height = ref2.current.offsetHeight + "px";
          ref1.current.style.width = "0";
        } else {
          ref1.current.style.width = "90%";
          ref1.current.style.height = "0";
        }
      }
    }

    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  });

  return (
    <section className="mainCont">
      <section
        ref={ref2}
        className={resultCond ? "Calc deactiveBorderCalc" : "Calc"}
      >
        <div className="display">
          {result ? <span>({result})</span> : ""}
          {val || "0"}
        </div>
        <div className="ops">
          <button onClick={() => resetHistory()}>CE</button>
          <button onClick={() => resetResult()}>C</button>
          <button onClick={deleteClick} id="delete">
            <i className="fa-solid fa-delete-left"></i>
          </button>
        </div>

        <div className="content">
          <div className="digits">
            {displayDigits()}
            <button onClick={() => clickDigits("0")}>0</button>
            <button onClick={() => clickDigits(".")}>.</button>
            <button onClick={() => equalClick()}>=</button>
          </div>

          <div className="ops">
            <button onClick={() => clickDigits("x")}>x</button>
            <button onClick={() => clickDigits("+")}>+</button>
            <button onClick={() => clickDigits("-")}>-</button>
            <button onClick={() => clickDigits("/")}>/</button>
          </div>
        </div>
      </section>

      <section
        ref={ref1}
        className={resultCond ? "history activeHistory" : "history "}
      >
        <div className="result">
          {history.length > 0
            ? history.map((h, ind) => {
                return (
                  <React.Fragment key={ind}>
                    <div id="cont" key={ind}>
                      <i
                        className="fa-regular fa-pen-to-square icon"
                        onClick={() => switchEdit(ind)}
                      ></i>
                      <p>{h.v + " ="}</p>
                      {Number.isInteger(h.r) ? (
                        <p key={Math.random() * 10}>{h.r}</p>
                      ) : (
                        <p>{Number(h.r).toFixed(3)}</p>
                      )}
                    </div>
                    {inpValue.map((inp, i) => {
                      if (i === ind) {
                        return (
                          <div className="inp" key={i}>
                            <input
                              type="text"
                              name="v"
                              value={inp.v}
                              className="newValue"
                              onChange={(e) => handleChange(e, i)}
                            />
                            <i
                              className="fa-solid fa-circle-check"
                              onClick={() => editValue(i)}
                            ></i>
                          </div>
                        );
                      }
                    })}
                  </React.Fragment>
                );
              })
            : ""}
        </div>
      </section>
    </section>
  );
}

export default Calculator;
