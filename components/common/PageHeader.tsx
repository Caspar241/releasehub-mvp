import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function PageHeader({
  title,
  description,
  actions,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-text-muted mb-3">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <span className="text-text-muted/40">/</span>
              )}
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="hover:text-accent transition-colors"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className="text-text-secondary">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Title & Actions */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-text-secondary leading-relaxed max-w-3xl">
              {description}
            </p>
          )}
        </div>

        {/* Actions Slot */}
        {actions && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
