import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Image } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setUrl(userInfo.avatar);
  }, [userInfo.setName, userInfo.setEmail]);

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

        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          avatar: responseData.url,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Image uploaded successfully:", responseData.url);
      }
    } catch (error) {
      console.error("Error parsing JSON from response:", error);
    } finally {
      setImageUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          avatar: url,
        }).unwrap();

        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated");
        navigate('/')
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Edit Profile</h1>
      <Form onSubmit={uploadImage}>
        <Form.Group className="d-flex justify-content-center ">
          {url && (
            <Image
              src={url ? url : ""}
              alt="profile"
              width="200px"
              height="200px" // Set a specific height to avoid stretching
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
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2 " controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
