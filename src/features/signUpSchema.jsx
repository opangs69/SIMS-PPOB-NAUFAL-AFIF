import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  first_name: Yup.string().required("Nama Depan is Required").min(2, "harus lebih dari 2 karakter").matches(/^[a-zA-Z]+$/, 'tidak boleh mengandung angka'),
  last_name: Yup.string().required("Nama Belakang is Required").min(2, "harus lebih dari 2 karakter").matches(/^[a-zA-Z]+$/, 'tidak boleh mengandung angka') ,
  password: Yup.string().required("password is required").min(8, "passwword minimal 8 karakter"),
  konfirmasiPassword: Yup.string().required("password is required").min(8, "passwword minimal 8 karakter").oneOf([Yup.ref('password'), null], 'Passwords harus sama'),
});
