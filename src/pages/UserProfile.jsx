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
        <input type="text" value="Kashish" className="p-2" disabled />
        <input type="text" value="Bansal" className="ms-0 ms-md-3 mt-2 mt-md-0 p-2" disabled />
        <br />

        <label htmlFor="yourGender" className="mt-4 mb-3">
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

        <label htmlFor="email" className="mt-4 mb-3 ">
          <strong>Email Address:</strong>{" "}
        </label>
        <br />
        <input type="email" value="sample@gmail.com" disabled className="p-2" />
        <br />

        <label htmlFor="phoneNumber" className="mt-4 mb-3">
          <strong>Phone Number:</strong>{" "}
        </label>
        <br />
        <input type="text" value="123456789" disabled className="p-2" />
      </div>
    </>
  );
}
