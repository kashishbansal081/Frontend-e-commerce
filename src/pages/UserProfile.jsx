import Navbar from "../components/Navbar";

export default function userProfile() {
  return (
    <>
      <Navbar />
      <h1 className="my-4">Your Profile</h1>
      <div className="container text-start">
        <h3 className="mb-3">Personal Information</h3><hr className="w-50"/>
        <label htmlFor="fullName" className="mb-2">
          <strong>Full Name:</strong>{" "}
        </label>
        <br />
       <p>Kashish Bansal</p>

        <label htmlFor="yourGender" className="mb-2">
          <strong>Your Gender:</strong>{" "}
        </label>
        <br />
        <input
          type="radio"
          name="gender"
          id="male"
          className="me-2 p-2"
          defaultChecked
          disabled
        />
        <label htmlFor="male">Male</label>
        <input type="radio" name="gender" id="male" className="ms-3 p-2" disabled value="Male"/>
        <label htmlFor="female" className="ms-2">
          Female
        </label>
        <br />

        <label htmlFor="email" className="mt-3 mb-3 ">
          <strong>Email Address:</strong>{" "}
        </label>
        <p>sample@gmail.com</p>
        <label htmlFor="phoneNumber" className="mt-2 mb-3">
          <strong>Phone Number:</strong>{" "}
        </label>
        <br />
        <p>9123456789</p>
      </div>
    </>
  );
}
