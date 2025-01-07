import { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import AuthorsService from "../../../services/authors.service";

const CreateModal = ({ open, onClose, onAuthorCreated }: any) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleCreate = () => {
    AuthorsService.adminCreate(firstName,lastName).then((response) => {
      if(response.success === false){
        onClose();
        alert('خطا ! \n'+response.errors[0].message)
        return;
      }

      onAuthorCreated();
      onClose();
      setFirstName('');
      setLastName('');
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyles }}>
        <Typography variant="h6">ایجاد نویسنده جدید</Typography>
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
        <Button variant="contained" color="primary" onClick={handleCreate} sx={{ mt: 2 }}>
          ایجاد
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

export default CreateModal;