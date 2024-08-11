import SignupForm from "../../components/SignupForm/Signup";
import NavBar from "../../components/Navbar/Navbar";

export default function Signup() {

    return(
        <>
           <NavBar pageType={"signup"}></NavBar>
          <SignupForm />
      </>
    )
}
