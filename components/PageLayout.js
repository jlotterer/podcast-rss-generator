import AuthHeader from './AuthHeader';

/**
 * Consistent page layout wrapper with hero section
 * Used across all screens for unified design
 */
export default function PageLayout({
  title,
  subtitle,
  children,
  maxWidth = "max-w-7xl",
  onCreateClick
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-card border-b border-border">
        <div className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-6`}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-[700] text-primary font-logo">poddio</h1>
              {title && (
                <h2 className="text-2xl font-semibold text-foreground mt-2">{title}</h2>
              )}
              {subtitle && (
                <p className="text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
            <AuthHeader onCreateClick={onCreateClick} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
        {children}
      </div>
    </div>
  );
}
