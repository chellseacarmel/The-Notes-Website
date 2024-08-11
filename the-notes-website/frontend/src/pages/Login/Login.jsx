import LoginForm from "../../components/LoginForm/Login";
import NavBar from "../../components/Navbar/Navbar";

export default function Login() {

    return(
        <>
        <NavBar pageType={"login"}></NavBar>
          <LoginForm />
      </>
    )
}
