import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useEditUserMutation } from "../slices/adminApiSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setEditUserCredentials } from "../slices/editUserSlice";

const EditUserScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const [editUser, { userLoading, error }] = useEditUserMutation();

  const { editUserInfo } = useSelector((state) => state.editUserInfo);

  // const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setName(editUserInfo.name);
    setEmail(editUserInfo.email);
    setUrl(editUserInfo.avatar);
  }, []);

  const uploadImage = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image first.");
      return;
    }

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "z0o48jjp");
    data.append("cloud_name", "fasils");

    setImageUploading(true);

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/fasils/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const responseBody = await response.text();

    try {
      const responseData = JSON.parse(responseBody);

      if (!response.ok) {
        toast.error(
          "Error uploading image:",
          responseData.message || "Unknown error"
        );
      } else {
        setUrl(responseData.url);
        
        const res = await editUser({
          _id: editUserInfo._id,
          name,
          email,
          avatar: responseData.url,
        }).unwrap();
        dispatch(setEditUserCredentials({ ...res.data }));
        toast.success("Image uploaded successfully:");
      }
    } catch (error) {
      console.error("Error parsing JSON from response:", error);
    } finally {
      setImageUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await editUser({
        _id: editUserInfo._id,
        name,
        email,
        avatar: url,
      }).unwrap();
      toast.success(res.message);
      navigate("/admin");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      {editUserInfo && (
        <>
          <h1>Edit User</h1>
          <Form onSubmit={uploadImage}>
            <Form.Group className="d-flex justify-content-center ">
              {url && (
                <Image
                  src={url ? url : ""}
                  alt="profile"
                  width="200px"
                  height="200px"
                  className="rounded-circle"
                  style={{ margin: "1em 0", objectFit: "cover" }}
                />
              )}
            </Form.Group>
            <Form.Group>
              <input
                type="file"
                name="profile"
                id="profile"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group>
              <Button
                variant="primary"
                style={{ marginTop: "10px" }}
                size="sm"
                type="submit"
              >
                {imageUploading ? "Uploading..." : "Upload"}
              </Button>
            </Form.Group>
          </Form>
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2 " controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2 " controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2 " controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                value={editUserInfo.password}
                disabled
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              {userLoading ? "Updating..." : "Update"}
            </Button>
          </Form>
        </>
      )}
    </FormContainer>
  );
};

export default EditUserScreen;
