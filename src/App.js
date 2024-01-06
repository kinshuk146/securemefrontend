import './App.css';
import { SignedOut, SignedIn } from "@clerk/clerk-react"
import { SignOutButton, SignInButton } from "@clerk/clerk-react"
import Password from './components/Password/Password';
import FileInput from './components/FileInput/FileInput'

function App() {

  return (
    <div className='App'>
      <SignedOut>
        <div className=''>
          <SignInButton />
        </div>
      </SignedOut>

      <SignedIn>
        <div className='signedin'>
          <div className='password'>
            <Password/>
          </div>
          <div className='file'>
            <FileInput/>
          </div>
        </div>
        <SignOutButton style={{ marginTop: '2rem' }} />
      </SignedIn>
    </div>

  );
}

export default App;



