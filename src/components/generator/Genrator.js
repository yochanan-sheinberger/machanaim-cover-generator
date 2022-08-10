/* eslint-disable jsx-a11y/heading-has-content */
import React, { useState, useEffect, useRef } from "react";
import { findDOMNode } from "react-dom";

import html2canvas from "html2canvas";
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Input,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhotoSizeSelectLargeIcon from "@mui/icons-material/PhotoSizeSelectLarge";

import cover from "../../assets/machanaim-cover.png";
import "./generator.css";

let imgOffset = {};
const NIKUD = [
  "ָ",
  "ַ",
  "ְ",
  "ּ",
  "ֶ",
  "ֱ",
  "ֵ",
  "ִ",
  "ׂ",
  "ׁ",
  "ֳ",
  "ֹ",
  "ֲ",
  "ֿ",
  "ֻ",
];

const filtereCharsWithNikud = (txt) => {
  const filtered = [];
  for (const char of txt) {
    console.log(12);
    if (!NIKUD.includes(char)) {
      filtered.push(char);
    } else {
      filtered[filtered.length - 1] += char;
    }
  }
  return filtered;
};

const adjustOriginForChars = (origin, char) => {
  switch (char) {
    case String(char.match(/י.*/i)):
    case String(char.match(/ז.*/i)):
    case String(char.match(/ן.*/i)):
    case String(char.match(/ו.*/i)):
      origin -= 2;
      break;
    case String(char.match(/מ.*/i)):
    case String(char.match(/א.*/i)):
      origin += 0.5;
      break;
    case String(char.match(/ש.*/i)):
      origin += 1.5;
      break;
    case String(char.match(/ף.*/i)):
    case String(char.match(/ל.*/i)):
    case String(char.match(/כ.*/i)):
    case String(char.match(/ג.*/i)):
      origin -= 1;
      break;
    case String(char.match(/נ.*/i)):
      origin -= 1.5;
      break;
    default:
      break;
  }
  return origin;
};

function Generator(props) {
  const [file, setFile] = useState(props.file);
  const [preview, setPreview] = useState("");
  const [sliderValue, setSliderValue] = useState(100);
  const [mouseDown, setMouseDown] = useState(false);
  const [bookNameStyle, setBookNameStyle] = useState("aligned");
  const [bookName, setBookName] = useState("");
  const [bookNameRadius, setBookNameRadius] = useState(300);
  const [bookNameOrigin, setBookNameOrigin] = useState(320);

  const bookNameRef = useRef();
  const imgRef = useRef();
  const coverRef = useRef();
  const coverTemplate = useRef();

  useEffect(() => {
    document.body.addEventListener("mouseup", () => {
      setMouseDown(false);
    });
    const coverTemplateHeight = findDOMNode(coverTemplate.current).style.height;
    findDOMNode(coverRef.current).style.height = coverTemplateHeight;
  }, []);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  useEffect(() => {
    findDOMNode(imgRef.current).style.width = sliderValue + "%";
  }, [sliderValue]);

  useEffect(() => {
    if (bookNameStyle === "curved") {
      circularText(bookName);
    }
  }, [bookNameStyle, bookName, bookNameRadius, bookNameOrigin]);

  const circularText = (txt) => {
    const txtArr = txt.split("");
    const filteredTxt = txtArr.filter((c) => !NIKUD.includes(c));
    const filteredCharsWithNikud = filtereCharsWithNikud(txt);
    const bookNameEl = findDOMNode(bookNameRef.current);
    bookNameEl.innerHTML = "";
    const deg = 90 / filteredTxt.length;
    let origin = bookNameOrigin;

    filteredCharsWithNikud.forEach((char) => {
      origin = adjustOriginForChars(origin, char);
      const charEl = `<p style='height:${bookNameRadius}px;position:absolute;transform:rotate(-${origin}deg);transform-origin:0 100%'>${char}</p>`;
      bookNameEl.innerHTML += charEl;
      origin += deg;
    });
  };

  const handleMouseDown = (e) => {
    e.target.style.cursor = "grabbing";
    setMouseDown(true);
    imgOffset = {
      offsetLeft: e.target.offsetLeft - e.clientX,
      offsetTop: e.target.offsetTop - e.clientY,
    };
  };

  const handleMouseUp = (e) => {
    e.target.style.cursor = "grab";
    setMouseDown(false);
  };

  const dragImg = (e) => {
    if (mouseDown) {
      e.target.style.left = e.clientX + imgOffset.offsetLeft + "px";
      e.target.style.top = e.clientY + imgOffset.offsetTop + "px";
    }
  };

  const download = () => {
    html2canvas(coverRef.current).then((canvas) => {
      let a = document.createElement("a");
      a.download = "ss.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    });
  };

  return (
    <>
      <AppBar className="controls" sx={{ position: "relative", mb: 2 }}>
        <Toolbar>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            textAlign="center"
          >
            <Grid item xs={12} sm={12} md={0.5} lg={2}>
              <IconButton
                edge="start"
                color="inherit"
                onClick={props.handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item xs={6} sm={3} md={1.5}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={bookNameStyle}
                onChange={(e) => setBookNameStyle(e.target.value)}
              >
                <FormControlLabel
                  value="aligned"
                  control={<Radio size="small" />}
                  label="כותרת ישרה"
                />
                <FormControlLabel
                  value="curved"
                  control={<Radio size="small" />}
                  label="כותרת מעוגלת"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={6} sm={3} md={2.5} lg={2.3}>
              <Input
                placeholder="הכנס שם הספר"
                className="book-name-input"
                variant="outlined"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
              />
            </Grid>
            <Grid item xs={3} sm={3} md={1.4}>
              <Slider
                sx={{ width: "100px", color: "#fff" }}
                size="small"
                getAriaValueText={setSliderValue}
                defaultValue={100}
                min={80}
                max={200}
                marks={[
                  {
                    value: 140,
                    label: "התאם גודל תמונה",
                  },
                ]}
              />
            </Grid>
            <Grid itemc xs={3} sm={3} md={1.4}>
              <Slider
                sx={{ width: "100px", color: "#fff" }}
                size="small"
                getAriaValueText={setBookNameRadius}
                defaultValue={230}
                min={100}
                max={360}
                marks={[
                  {
                    value: 230,
                    label: "התאם רדיוס כותרת",
                  },
                ]}
                disabled={bookNameStyle === "aligned"}
              />
            </Grid>
            <Grid item xs={3} sm={3} md={1.4}>
              <Slider
                sx={{ width: "100px", color: "#fff" }}
                size="small"
                getAriaValueText={setBookNameOrigin}
                defaultValue={320}
                min={300}
                max={340}
                marks={[
                  {
                    value: 320,
                    label: "התאם זווית כותרת",
                  },
                ]}
                disabled={bookNameStyle === "aligned"}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={1} lg={2}>
              <Button
                autoFocus
                variant="outlined"
                color="inherit"
                onClick={download}
              >
                הורד
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className="generator">
        <div className="cover">
          <div className="cover-wrapper" ref={coverRef}>
            {bookNameStyle === "curved" ? (
              <h2 className="curved-book-name" ref={bookNameRef}></h2>
            ) : (
              <h2 className="aligned-book-name">{bookName}</h2>
            )}
            <img
              className="cover-template"
              src={cover}
              draggable={false}
              ref={coverTemplate}
              alt=""
            />
            <img
              className="uploaded-img"
              src={preview}
              width={sliderValue + "%"}
              alt=""
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchEnd={() => setMouseDown(false)}
              onMouseMove={dragImg}
              onTouchMove={dragImg}
              draggable={false}
              ref={imgRef}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Generator;
