import React, { useState } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import AssetsPreview from './AssetsPreview';
import { getAssetPrompt } from '../utils/getAssetPrompt';

const AssetsGenerator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [assetUrls, setAssetUrls] = useState<string[]>();
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');
  const { user } = useUser();
  const { openSignUp } = useClerk();

  const generateAssets = async (input: string) => {
    const response = await fetch(`/api/assets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: getAssetPrompt(userInput) }),
    });
    const { imageUrl } = await response.json();
    const assets = [imageUrl] as string[];
    setAssetUrls(assets);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      openSignUp();
      return;
    }

    setError('');
    setIsLoading(true);
    setAssetUrls([]);

    try {
      await generateAssets(userInput);
    } catch (error) {
      setError('There was an error reading the site. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <p className="instructions-text">Enter the site you want to chat with</p>
      <form onSubmit={onSubmit}>
        <div className="input-group">
          <input
            className="input-style"
            name="url-input"
            type="text"
            placeholder="Drop the url here"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div>
            <button className="label-style main-btn" type="submit">
              Submit
            </button>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
        {assetUrls && <AssetsPreview assetUrls={assetUrls} />}
      </form>
    </div>
  );
};

export default AssetsGenerator;