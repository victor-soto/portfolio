export default function DebugPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Open Graph Debug Page</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Test Open Graph Image</h2>
          <img 
            src="/opengraph-image" 
            alt="Open Graph Image" 
            className="border border-gray-300 rounded"
            width={600}
            height={315}
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Meta Tags</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          {`<!-- Open Graph -->
          <meta property="og:title" content="Victor Soto | Portfolio" />
          <meta property="og:description" content="Backend Software Engineer with 10+ years of experience." />
          <meta property="og:url" content="https://victor-soto.codestack24.com" />
          <meta property="og:site_name" content="Victor Soto | Portfolio" />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:image" content="https://victor-soto.codestack24.com/opengraph-image" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Victor Soto - Full Stack Developer" />

          <!-- Twitter -->
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Victor Soto | Portfolio" />
          <meta name="twitter:description" content="Backend Software Engineer with 10+ years of experience." />
          <meta name="twitter:creator" content="@victorsoto" />
          <meta name="twitter:image" content="https://victor-soto.codestack24.com/opengraph-image" />`}
          </pre>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Testing Tools</h2>
          <div className="space-y-2">
            <a 
              href="https://developers.facebook.com/tools/debug/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-blue-600 hover:underline"
            >
              Facebook Sharing Debugger
            </a>
            <a 
              href="https://cards-dev.twitter.com/validator" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-blue-600 hover:underline"
            >
              Twitter Card Validator
            </a>
            <a 
              href="https://www.linkedin.com/post-inspector/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-blue-600 hover:underline"
            >
              LinkedIn Post Inspector
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
