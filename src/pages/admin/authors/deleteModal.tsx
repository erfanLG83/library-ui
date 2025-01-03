import { Box, Button, Modal, Typography } from "@mui/material";
import AuthorsService from "../../../services/authors.service";

const DeleteModal = ({ open, author, onClose, onAuthorDeleted }: any) => {
  const handleDelete = () => {
    AuthorsService.delete(author.id).then((response) => {
      onClose();
      if(response.success === false){
        alert('خطا ! \n'+response.errors[0].message);
        onClose();
        return;
      }
      
      onAuthorDeleted();
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyles }}>
        <Typography variant="h6" gutterBottom>
          آیا از حذف این نویسنده مطمئن هستید؟
        </Typography>
        <Typography color="textSecondary">{author?.title}</Typography>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            انصراف
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            حذف
          </Button>
        </Box>
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

export default DeleteModal;
