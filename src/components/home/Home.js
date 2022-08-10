/* eslint-disable jsx-a11y/heading-has-content */
import React, { useState, useEffect } from "react";

import { FileUploader } from "react-drag-drop-files";
import {
  AppBar,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import HdrWeakIcon from "@mui/icons-material/HdrWeak";
import Dialog from "../fullScreenDialog/FullScreenDialog";
import logo from "../../assets/logo.jpg";
import kidRight from "../../assets/kid-right.png";
import kidLeft from "../../assets/kid-left.png";

import "./home.css";

const instructions = [
  "העלו תמונה לבחירתכם",
  "הגדילו/הקטינו אותה באמצעות הסליידר ושנו את מיקומה באמצעות העכבר להתאמה מושלמת",
  "הוסיפו כותרת מתאימה",
  "התאימו את סגנון הכותרת ושפרו אותה באמצעות הסליידרים",
  "לחצו על הורדה ושתפו את החברים",
];
const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];


function Home() {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (file) {
      setOpen(true);
    }
  }, [file]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (newFile) => {
    setFile(newFile);
  };

  const instructionsList = instructions.map((ins) => (
    <ListItem key={ins.substring(0, 10)} disablePadding>
      <ListItemButton disableRipple>
        <ListItemIcon>
          <HdrWeakIcon />
        </ListItemIcon>
        <ListItemText primary={ins} />
      </ListItemButton>
    </ListItem>
  ));

  return (
    <>
      <Box className="home">
        <AppBar sx={{ position: "relative", mb: 2, p: 2, textAlign: "center" }}>
          <Toolbar sx={{ display: "block" }}>
            <Box className="kids">
              <img className="kid kid-right" src={kidRight} alt="" />
              <img className="kid kid-left" src={kidLeft} alt="" />
              <img className="logo" src={logo} alt="" />
            </Box>

            <Typography variant="h2">מְחוֹלֵל כְּרִיכוֹת מַחֲנַיִם</Typography>
          </Toolbar>
        </AppBar>
        <Box maxWidth={"520px"} margin="auto">
          <Typography variant="h3">הוראות שימוש:</Typography>
          <List className="inst-list">{instructionsList}</List>
          <Typography textAlign="center" variant="subtitle2">להערות הארות והצעות <a href="mailto:yochkesh@gmail.com">צרו קשר</a></Typography>

        </Box>

        <Box marginTop={5}>
          <FileUploader
            handleChange={handleChange}
            name="file"
            label="העלה או גרור תמונה לכאן"
            types={fileTypes}
          />
        </Box>
      </Box>
      <Dialog open={open} file={file} handleClose={handleClose} />
    </>
  );
}

export default Home;
