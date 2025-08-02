import * as Yup from "yup";

export const editProfileSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  first_name: Yup.string().required("Nama Depan is Required").min(2, "harus lebih dari 2 karakter").matches(/^[a-zA-Z]+$/, 'tidak boleh mengandung angka'),
  last_name: Yup.string().required("Nama Belakang is Required").min(2, "harus lebih dari 2 karakter").matches(/^[a-zA-Z]+$/, 'tidak boleh mengandung angka') ,
});
