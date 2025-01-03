import { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import CategoriesService from "../../services/categories.service";

const CreateCategoryModal = ({ open, onClose, onCategoryCreated }: any) => {
  const [title, setTitle] = useState("");

  const handleCreate = () => {
    CategoriesService.create(title).then((response) => {
      if(response.success === false){
        onClose();
        alert('خطا ! \n'+response.errors[0].message)
        return;
      }

      onCategoryCreated();
      onClose();
      setTitle("");
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyles }}>
        <Typography variant="h6">ایجاد دسته‌بندی جدید</Typography>
        <TextField
          label="عنوان"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

export default CreateCategoryModal;