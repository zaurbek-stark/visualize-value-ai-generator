import React, { useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import AssetsPreview from './AssetsPreview';
import { getAssetPrompt } from '../utils/getAssetPrompt';

const AssetsGenerator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [assetUrls, setAssetUrls] = useState<string[]>(['', '', '']);
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');
  const { user } = useUser();
  const { openSignUp } = useClerk();

  useEffect(() => {
    if (user) {
      // If the user is authenticated, get the last input from localStorage
      const savedInput = localStorage.getItem('lastInput');
      if (savedInput) {
        setUserInput(savedInput);
        localStorage.removeItem('lastInput');
      }
    }
  }, [user]);

  const generateAssets = async (input: string) => {
    const response = await fetch(`/api/assets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: getAssetPrompt(input) }),
    });
    const { imageUrl } = await response.json();
    setAssetUrls(assets => [...assets.slice(0,2), imageUrl]);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      localStorage.setItem('lastInput', userInput);
      openSignUp();
      return;
    }

    setError('');
    setIsLoading(true);
    setAssetUrls([]);

    try {
      await generateAssets(userInput);
    } catch (error) {
      setError('There was an error generating the illustration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <p className="instructions-text">Enter the idea/concept that you want to visualize.</p>
      <form className="inline-flex m-auto" onSubmit={onSubmit}>
        <div className="input-group">
          <input
            className="input-style"
            name="idea-input"
            type="text"
            placeholder='e.g. "Smart work beats hard work"'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>
        <div>
          <button className="label-style send-button" type="submit" disabled={isLoading} />
        </div>
      </form>
      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      <AssetsPreview assetUrls={assetUrls} />
    </div>
  );
};

export default AssetsGenerator;