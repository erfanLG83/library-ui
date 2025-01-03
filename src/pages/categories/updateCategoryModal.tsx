import React, { useState, useEffect } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import CategoriesService from "../../services/categories.service";

const UpdateCategoryModal = ({ open, category, onClose, onCategoryUpdated }: any) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (category) setTitle(category.title);
  }, [category]);

  const handleUpdate = () => {
    CategoriesService.update(category.id,title).then((response) => {
        onClose();
        if(response.success === false){
          alert('خطا ! \n'+response.errors[0].message);
          onClose();
          return;
        }
        
        setTitle('');
        onCategoryUpdated();
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyles }}>
        <Typography variant="h6">ویرایش دسته‌بندی</Typography>
        <TextField
          label="عنوان"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

export default UpdateCategoryModal;