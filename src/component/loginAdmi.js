
function LoginAdmi(){
    return(
        <form className="formAdmi">
            <div class="inputs">
                <input type="string" class="inputName" placeholder="Name administrator"/>
            </div>
            <div class="inputs">
                <input type="password" class="inputPassword" placeholder="Password"/>
            </div>
            <button type="submit" class="btnSubmit">Submit</button>
        </form>
    );
};

export default LoginAdmi;