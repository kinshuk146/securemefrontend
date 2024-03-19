import './App.css';
import { SignedOut, SignedIn } from "@clerk/clerk-react"
import { SignOutButton, SignInButton } from "@clerk/clerk-react"
import Password from './components/Password/Password';
import FileInput from './components/FileInput/FileInput'

function App() {

  return (
    <div className='App'>
      <SignedOut>
        <div className='signedout'>
          <h1>Welcome to Secure Me</h1>
          <p>Secure your passwords and photos with AES encryption</p>
          <div className=''>
            <SignInButton />
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className='password'>
          <Password />
        </div>
        <div className='file'>
          <FileInput />
        </div>
        <SignOutButton style={{ marginTop: '2rem' }} />
      </SignedIn>
    </div>

  );
}

export default App;



