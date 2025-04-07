# AI Chat Base Integration Guide

This document provides comprehensive instructions for integrating the `ai-chat-base` package into your application.

## Installation

First, install the package using npm or yarn:

```bash
# Using npm
npm install ai-chat-base

# Using yarn
yarn add ai-chat-base
```

Make sure your application has the required peer dependencies:

```bash
npm install react@>=16.8.0 react-dom@>=16.8.0 react-router-dom@>=6.0.0
```

## Basic Integration

The simplest way to add the chat interface to your application is using the `ChatContainer` component:

```jsx
import React from 'react';
import { ChatContainer } from 'ai-chat-base';

function ChatPage() {
  return (
    <div style={{ height: '600px' }}>
      <ChatContainer />
    </div>
  );
}

export default ChatPage;
```

> **Important:** Always wrap the `ChatContainer` in a div with a defined height or it will not display properly.

## Environment Configuration

To enable full functionality, you need to set up environment variables:

1. Create or update your `.env` file with the following variables:

```
# OpenAI API Configuration
REACT_APP_OPENAI_API_KEY=your_openai_api_key

# Optional Firebase Configuration (if you want conversation persistence)
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

2. Access these environment variables in your application:

```jsx
import React from 'react';
import { ChatContainer } from 'ai-chat-base';

function ChatPage() {
  const chatConfig = {
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    model: 'gpt-4', // or any other model you prefer
    temperature: 0.7
  };
  
  return (
    <div style={{ height: '600px', width: '100%' }}>
      <ChatContainer {...chatConfig} />
    </div>
  );
}

export default ChatPage;
```

## Advanced Configuration

The chat component accepts several configuration options:

```jsx
import React from 'react';
import { ChatContainer } from 'ai-chat-base';

function ChatPage() {
  const chatConfig = {
    // API Configuration
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    model: 'gpt-4',
    maxTokens: 2048,
    temperature: 0.7,
    
    // UI Configuration
    theme: 'dark', // 'light' or 'dark'
    
    // Initial Messages
    initialMessages: [
      {
        id: 'welcome-message',
        role: 'system',
        content: 'Welcome! How can I assist you today?',
        timestamp: new Date()
      }
    ]
  };
  
  return (
    <div className="chat-wrapper" style={{ height: '700px' }}>
      <ChatContainer {...chatConfig} />
    </div>
  );
}

export default ChatPage;
```

## Styling and Layout

### Container Styling

The chat component will fill its parent container. For the best user experience:

1. Set a specific height on the container
2. Consider using flex or grid layouts for responsive designs

```jsx
<div 
  style={{ 
    height: '70vh', 
    maxHeight: '800px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    overflow: 'hidden'
  }}
>
  <ChatContainer theme="light" />
</div>
```

### Custom Theme

You can create a custom theme to match your application's design:

```jsx
import React from 'react';
import { ChatContainer, createCustomTheme } from 'ai-chat-base';

function ChatPage() {
  // Create a custom theme matching your brand
  const brandTheme = createCustomTheme({
    primary: '#0066CC', // Your brand's primary color
    secondary: '#FF6B00',
    background: '#FAFAFA',
    text: '#333333',
    fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, sans-serif'
  });

  return (
    <div style={{ height: '600px' }}>
      <ChatContainer 
        apiKey={process.env.REACT_APP_OPENAI_API_KEY}
        theme="light" 
        customTheme={brandTheme} 
      />
    </div>
  );
}

export default ChatPage;
```

## Custom Chat Implementation

For more control, you can use the `useChat` hook to build your own UI:

```jsx
import React, { useState } from 'react';
import { useChat, Theme } from 'ai-chat-base';

function CustomChatInterface() {
  const { messages, sendMessage, isLoading, clearChat } = useChat({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    model: 'gpt-3.5-turbo'
  });

  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="custom-chat" style={{ 
      height: '600px', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: Theme.light.background,
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {/* Chat header */}
      <div style={{ 
        padding: '12px 16px',
        borderBottom: `1px solid ${Theme.light.border}`,
        fontWeight: 'bold'
      }}>
        Custom Chat Interface
      </div>
      
      {/* Messages area */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            style={{
              padding: '10px 14px',
              margin: msg.role === 'user' ? '0 0 0 auto' : '0 auto 0 0',
              borderRadius: '12px',
              maxWidth: '80%',
              backgroundColor: msg.role === 'user' 
                ? Theme.light.userMessage 
                : Theme.light.aiMessage,
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            }}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div style={{ 
            padding: '10px 14px',
            borderRadius: '12px',
            backgroundColor: Theme.light.aiMessage,
            alignSelf: 'flex-start',
            opacity: 0.7
          }}>
            Thinking...
          </div>
        )}
      </div>
      
      {/* Input area */}
      <div style={{ 
        display: 'flex', 
        padding: '12px 16px',
        borderTop: `1px solid ${Theme.light.border}`,
        backgroundColor: Theme.light.paper
      }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          style={{ 
            flex: 1, 
            padding: '10px 12px',
            border: `1px solid ${Theme.light.border}`,
            borderRadius: '4px',
            outline: 'none'
          }}
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          style={{ 
            marginLeft: '8px', 
            padding: '10px 16px',
            backgroundColor: Theme.light.primary,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default CustomChatInterface;
```

## Firebase Integration (Optional)

For conversation persistence across sessions, configure Firebase:

1. Add Firebase to your project:
   ```bash
   npm install firebase
   ```

2. Create a Firebase configuration file:
   ```jsx
   // src/firebase-config.js
   import { initializeApp } from 'firebase/app';
   import { getFirestore } from 'firebase/firestore';
   import { getAuth } from 'firebase/auth';

   const firebaseConfig = {
     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
     appId: process.env.REACT_APP_FIREBASE_APP_ID
   };

   const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   export const auth = getAuth(app);
   export default app;
   ```

3. Use Firebase with the chat component:
   ```jsx
   import React from 'react';
   import { ChatContainer } from 'ai-chat-base';
   import firebaseApp from './firebase-config';

   function ChatPage() {
     return (
       <div style={{ height: '600px' }}>
         <ChatContainer 
           apiKey={process.env.REACT_APP_OPENAI_API_KEY}
           firebaseApp={firebaseApp}
           persistConversations={true}
         />
       </div>
     );
   }

   export default ChatPage;
   ```

## Troubleshooting

### Common Issues

1. **Component not displaying properly**
   - Ensure the parent container has a defined height
   - Check that all peer dependencies are installed correctly

2. **API calls failing**
   - Verify your OpenAI API key is correct and has sufficient credits
   - Make sure environment variables are correctly set and accessible

3. **Styling conflicts**
   - Wrap the component in a container with isolated styles
   - Use a CSS reset within the component container

4. **TypeScript errors**
   - Import types from 'ai-chat-base' to ensure type safety
   - Update to the latest version of the package for improved type definitions

### Getting Support

If you encounter issues not covered by this guide, please:
1. Check the [documentation](https://github.com/TomFranse/chat-base) for updates
2. File an issue on the GitHub repository
3. Contact the package maintainer at tom@inventhor.com

## API Reference

For a complete list of props, hooks, and utilities, please refer to the [API documentation](https://github.com/TomFranse/chat-base/blob/main/docs/example-usage.md). 