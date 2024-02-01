
import { ReactReader } from 'react-reader';
import { useAuth } from './AuthProvider';

const BookPage = () => {
  const { isLogin, logout } = useAuth();
  
  const ebookUrl = './Freeing.epub';

  

  const handleLogout = () => {
    logout();
  };

  

  if (!isLogin) {
    return null;
  }

  return (
    <div>
      <div className='LogoSection'>
        <img src='logoas.svg' />
      </div>

      <div style={{ position: 'relative', height: '80vh' }}>
        <ReactReader url={ebookUrl} />
      </div>
      <div style={{ marginTop: '20px', whiteSpace: 'pre-line' }}></div>
      <div className='LogoutBtn'>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default BookPage;
