import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import BooksService from "../../../services/books.service";
import AuthorsService from "../../../services/authors.service";
import PublishersService from "../../../services/publishers.service";
import CategoriesService from "../../../services/categories.service";
import { AuthorModel } from "../../../services/Models/AuthorModels";
import { PublisherModel } from "../../../services/Models/PublisherModels";
import { CategoryModel } from "../../../services/Models/CategoryModels";
import { BookLanguage, CreateBookRequest, UpdateBookRequest } from "../../../services/Models/BookModels";

const languages = [
  { value: 0, label: "فارسی" },
  { value: 1, label: "انگلیسی" },
  { value: 2, label: "دیگر" },
];

const BookModal = ({ open, onClose, onBookSaved, bookData = null } : any) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    publicationDate: "",
    interpreters: "",
    language: 0,
    quantity: 0,
    authorId: "",
    publisherId: "",
    categoryId: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    publicationDate: "",
    interpreters: "",
    quantity: "",
    authorId: "",
    publisherId: "",
    categoryId: "",
  });

  const [authors, setAuthors] = useState<AuthorModel[]>([]);
  const [publishers, setPublishers] = useState<PublisherModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  useEffect(() => {
    AuthorsService.getAll(1, 10000).then((response) => {
      setAuthors(response.data?.items ?? []);
    });
    PublishersService.getAll(1, 10000).then((response) => {
      setPublishers(response.data?.items ?? []);
    });
    CategoriesService.getAll(1, 10000).then((response) => {
      setCategories(response.data?.items ?? []);
    });
  }, []);

  useEffect(() => {
    setForm({
      authorId : bookData?.author.id,
      categoryId : bookData?.category.id,
      publisherId : bookData?.publisher.id,
      ...bookData
    });
  }, [bookData]);

  const handleInputChange = (field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      description: "",
      publicationDate: "",
      interpreters: "",
      quantity: "",
      authorId: "",
      publisherId: "",
      categoryId: "",
    };

    if (!form.title.trim()) {
      newErrors.title = "عنوان الزامی است.";
      isValid = false;
    }
    if (!form.description.trim()) {
      newErrors.description = "توضیحات الزامی است.";
      isValid = false;
    }
    if (!form.publicationDate.trim()) {
      newErrors.publicationDate = "تاریخ انتشار الزامی است.";
      isValid = false;
    }
    if (form.language !== BookLanguage.Persian && (!form.interpreters || !form.interpreters.trim())) {
      newErrors.interpreters = "مترجمین الزامی است برای زبانی غیر از فارسی.";
      isValid = false;
    }
    if (form.quantity < 0) {
      newErrors.quantity = "تعداد موجود نمی‌تواند کمتر از صفر باشد.";
      isValid = false;
    }
    if (!form.authorId) {
      newErrors.authorId = "نویسنده الزامی است.";
      isValid = false;
    }
    if (!form.publisherId) {
      newErrors.publisherId = "ناشر الزامی است.";
      isValid = false;
    }
    if (!form.categoryId) {
      newErrors.categoryId = "دسته‌بندی الزامی است.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (bookData) {
      const updateBook : UpdateBookRequest = {
        title: form.title,
        description: form.description,
        language: form.language,
        quantity: form.quantity,
        interpreters: form.interpreters || null,
        publicationDate: form.publicationDate,
        authorId: form.authorId,
        publisherId: form.publisherId,
        categoryId: form.categoryId,
        id : bookData.id
      };

      BooksService.update(updateBook).then(response => {
        if (response.success === false) {
          alert("خطا ! \n" + response.errors[0].message);
          onClose();
          return;
        }
        onBookSaved();
        onClose();
      });

      return;
    }

    const newBook: CreateBookRequest = {
      title: form.title,
      description: form.description,
      language: form.language,
      quantity: form.quantity,
      interpreters: form.interpreters || null,
      publicationDate: form.publicationDate,
      authorId: form.authorId,
      publisherId: form.publisherId,
      categoryId: form.categoryId,
    };

    BooksService.create(newBook).then((response) => {
      if (response.success === false) {
        alert("خطا ! \n" + response.errors[0].message);
        onClose();
        return;
      }
      onBookSaved();
      onClose();
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyles }}>
        <Typography variant="h6">{bookData ? "ویرایش کتاب" : "افزودن کتاب جدید"}</Typography>
        <TextField
          label="عنوان"
          fullWidth
          value={form.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
          sx={{ mt: 2 }}
        />
        <TextField
          label="توضیحات"
          fullWidth
          value={form.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          error={!!errors.description}
          helperText={errors.description}
          sx={{ mt: 2 }}
        />
        <TextField
          label="تاریخ انتشار"
          fullWidth
          value={form.publicationDate}
          onChange={(e) => handleInputChange("publicationDate", e.target.value)}
          error={!!errors.publicationDate}
          helperText={errors.publicationDate}
          sx={{ mt: 2 }}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>زبان</InputLabel>
          <Select
            value={form.language}
            onChange={(e) => handleInputChange("language", Number(e.target.value))}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.value} value={lang.value}>
                {lang.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="مترجمین"
          type="text"
          fullWidth
          value={form.interpreters}
          onChange={(e) => handleInputChange("interpreters", e.target.value)}
          error={!!errors.interpreters}
          helperText={errors.interpreters}
          sx={{ mt: 2 }}
          disabled={form.language === BookLanguage.Persian}
        />
        <TextField
          label="تعداد موجود"
          type="number"
          fullWidth
          value={form.quantity}
          onChange={(e) => handleInputChange("quantity", Number(e.target.value))}
          error={!!errors.quantity}
          helperText={errors.quantity}
          sx={{ mt: 2 }}
        />
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.authorId}>
          <InputLabel>نویسنده</InputLabel>
          <Select
            value={form.authorId}
            onChange={(e) => handleInputChange("authorId", e.target.value)}
          >
            {authors.map((author) => (
              <MenuItem key={author.id} value={author.id}>
                {author.firstName} {author.lastName}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.authorId}</FormHelperText>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.publisherId}>
          <InputLabel>ناشر</InputLabel>
          <Select
            value={form.publisherId}
            onChange={(e) => handleInputChange("publisherId", e.target.value)}
          >
            {publishers.map((publisher) => (
              <MenuItem key={publisher.id} value={publisher.id}>
                {publisher.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.publisherId}</FormHelperText>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.categoryId}>
          <InputLabel>دسته‌بندی</InputLabel>
          <Select
            value={form.categoryId}
            onChange={(e) => handleInputChange("categoryId", e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.categoryId}</FormHelperText>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
          {bookData ? "ویرایش" : "افزودن"}
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

export default BookModal;