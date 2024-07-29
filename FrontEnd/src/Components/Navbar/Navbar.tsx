import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import useUserStore from '../../useFormStore';

interface LayoutProps {
  children: React.ReactNode;
}

interface User {
  id: string;
  name: string;
  Photo: string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { userProfile } = useUserStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [photoFilename, setPhotoFilename] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const filename = userProfile.Photo.split('\\').pop().split('/').pop();
    setPhotoFilename(filename);
  }, [userProfile.Photo]);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    if (searchQuery.trim()) {
      try {
        // const response = await fetch(`http://localhost:8000/api/find?name1=${searchQuery}`);
        const response = await fetch(`http://51.20.130.55/api/find?name1=${searchQuery}`);
        const data: User[] = await response.json();
        
        // Extract filenames for each user in the search results
        const updatedData = data.map(user => {
          const photoFilename = user.Photo.split('\\').pop().split('/').pop();
          return { ...user, Photo: photoFilename };
        });

        setSearchResults(updatedData);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  const handleUserClick = (id: string) => {
    navigate(`/view/${id}`);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <img 
            // src={`http://localhost:8000/api/photo/${photoFilename}`} 
            src={`http://51.20.130.55/api/photo/${photoFilename}`}
            alt="Profile" 
            className="navbar-profile-photo"
          />
          <div className="navbar-title">My Portfolio</div>
        </div>
        <div className="navbar-right">
          <form onSubmit={handleSearch} className="navbar-search-form">
            <input 
              type="search" 
              placeholder="Search..." 
              className="navbar-search-bar" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          {searchResults.length > 0 && (
            <div className="search-results">
              <ul>
                {searchResults.map((user) => (
                  <li key={user.id} onClick={() => handleUserClick(user.id)}>
                    <img src={`http://localhost:8000/api/photo/${user.Photo}`} alt={user.name} className="result-photo" />
                    <span>{user.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;
