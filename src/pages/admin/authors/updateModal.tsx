import React, { useState, useEffect } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import AuthorsService from "../../../services/authors.service";

const UpdateModal = ({ open, author, onClose, onAuthorUpdated }: any) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (author){
      setFirstName(author.firstName);
      setLastName(author.lastName);
    };
  }, [author]);

  const handleUpdate = () => {
    AuthorsService.adminUpdate(author.id,firstName,lastName).then((response) => {
        onClose();
        if(response.success === false){
          alert('خطا ! \n'+response.errors[0].message);
          onClose();
          return;
        }
          
        setFirstName('');
        setLastName('');
        onAuthorUpdated();
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyles }}>
        <Typography variant="h6">ویرایش نویسنده</Typography>
        <TextField
          label="نام"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          label="نام خانوادگی"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>
          ویرایش
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default UpdateModal;