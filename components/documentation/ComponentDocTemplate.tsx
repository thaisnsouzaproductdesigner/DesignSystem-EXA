import React, { useState, useEffect } from "react";
import { copyToClipboard } from "../../utils/clipboard";
import { ThemeScopeProvider } from "../ui/theme-scope";
import { useTheme } from "../../exa-design-system/contexts/ThemeContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ComponentTokenContent, ComponentTokenDocProps } from "./ComponentTokenDocTemplate";
import { DocPreviewHeader } from "./DocPreviewHeader";

export interface PropertyConfig<T = any> {
  name: string;
  description: string;
  type: string;
  defaultValue?: string;
  controlType: "select" | "toggle" | "input" | "text" | "number" | "textarea" | "none";
  options?: Array<{ label: string; value: string } | string>;
  getValue?: (state: T) => any;
  setValue?: (state: T, value: any) => void;
  hidden?: (state: T) => boolean;
}

export interface ComponentDocConfig<T = any> {
  name: string;
  description: string;
  properties: PropertyConfig<T>[];
  generateCode: (state: T) => string;
  renderPreview: (
    state: T,
    theme: "light" | "dark",
  ) => React.ReactNode;
  initialState: T;
  designGuidelines?: {
    dos?: string[];
    donts?: string[];
  };
}

interface ComponentDocTemplateProps<T = any> {
  config: ComponentDocConfig<T>;
  tokenConfig?: Omit<ComponentTokenDocProps, 'componentName' | 'description'>;
}

const TAB_TRIGGER_CLASS = "bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-b-[var(--bg-accent-primary)] data-[state=active]:text-[var(--text-primary)] text-[var(--text-secondary)] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 transition-none font-medium";

export function ComponentDocTemplate<T = any>({
  config,
  tokenConfig,
}: ComponentDocTemplateProps<T>) {
  const { darkMode } = useTheme();
  const [state, setState] = useState<T>(config.initialState);
  const [theme, setTheme] = useState<"light" | "dark">(darkMode ? "dark" : "light");
  const [showCode, setShowCode] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    setTheme(darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleZoomIn = () =>
    setZoom((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () =>
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  const handleZoomReset = () => setZoom(1);

  const updateState = (key: string, value: any) => {
    setState({ ...state, [key]: value });
  };

  // Render the component playground content
  const renderComponentTab = () => (
    <div className="py-8">
      <div className="mb-8">
        <DocPreviewHeader />
      </div>

      <div
        className="rounded-[6px] max-w-[900px] mx-auto mb-10 overflow-hidden"
        style={{
          border: "1px solid var(--border-primary)",
          boxShadow: "var(--shadow-card)",
          backgroundColor: "var(--surface-elevated)",
        }}
      >
        {/* Preview Header */}
        <div
          className="h-[40px] px-3 flex items-center gap-3.5"
          style={{
            borderBottom: "1px solid var(--border-primary)",
          }}
        >
          <div className="w-3.5 h-3.5 bg-[var(--border-primary)] rounded-full opacity-50"></div>
          <div className="w-3.5 h-3.5 bg-[var(--border-primary)] rounded-full opacity-50"></div>
          <div className="w-3.5 h-3.5 bg-[var(--border-primary)] rounded-full opacity-50"></div>
        </div>

        {/* Preview Body */}
        <ThemeScopeProvider theme={theme}>
          <div
            id="preview-container"
            className={`min-h-[182px] flex items-center justify-center p-8 relative rounded-b-[6px] ${theme === 'dark' ? 'bg-[var(--surface-primary)] dark' : 'bg-[var(--surface-primary)]'}`}
            data-theme={theme}
          >
            {theme === "dark" && (
              <style>{`
                /* Fix for Radix Portals (Popover, Dropdown, etc) escaping the dark theme scope in documentation */
                [data-radix-popper-content-wrapper] {
                  z-index: 50 !important;
                }
              `}</style>
            )}
            <div style={{ transform: `scale(${zoom})` }} className="w-full flex justify-center">
              {config.renderPreview(state, theme)}
            </div>
          </div>
        </ThemeScopeProvider>
      </div>

      {/* Show Code Button */}
      <div className="max-w-[900px] mx-auto mb-6 flex justify-end">
        <button
          onClick={() => setShowCode(!showCode)}
          className="px-4 py-2 text-[13px] font-medium text-[var(--bg-accent-primary)] hover:text-[var(--bg-accent-hover)] bg-transparent border border-[var(--border-primary)] hover:border-[var(--bg-accent-primary)] rounded transition-colors"
        >
          {showCode ? "Hide code" : "Show code"}
        </button>
      </div>

      {/* Code Block */}
      {showCode && (
        <div className="max-w-[900px] mx-auto mb-10">
          <div className="border border-[var(--border-primary)] rounded-[6px] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] bg-[var(--surface-primary)] overflow-hidden">
            <div className="bg-[var(--surface-secondary)] px-4 py-2 border-b border-[var(--border-primary)] flex items-center justify-between">
              <span className="text-[13px] font-mono text-[var(--text-secondary)]">
                {config.name}.tsx
              </span>
              <button
                onClick={() => {
                  copyToClipboard(config.generateCode(state));
                }}
                className="text-[12px] text-[var(--bg-accent-primary)] hover:text-[var(--bg-accent-hover)] font-medium transition-colors"
                title="Copy code"
              >
                Copy
              </button>
            </div>
            <pre className="p-6 overflow-x-auto bg-[var(--surface-inverse)] text-[var(--text-on-inverse)]">
              <code
                className="text-[13px] font-mono leading-[20px]"
                style={{
                  fontFamily:
                    'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace',
                }}
              >
                {config.generateCode(state)}
              </code>
            </pre>
          </div>
        </div>
      )}

      {/* Controls Table */}
      <div className="max-w-[900px] mx-auto">
        <table className="w-full border-collapse text-[13px] leading-[20px]">
          <thead>
            <tr>
              <th className="text-left pb-2.5 px-5 font-semibold text-[var(--text-primary)]">
                <span>Name</span>
              </th>
              <th className="text-left pb-2.5 px-3.5 w-[35%] font-semibold text-[var(--text-primary)]">
                <span>Description</span>
              </th>
              <th className="text-left pb-2.5 px-3.5 w-[15%] font-semibold text-[var(--text-primary)]">
                <span>Default</span>
              </th>
              <th className="text-left pb-2.5 px-5 w-[25%] font-semibold text-[var(--text-primary)]">
                <span>Control</span>
              </th>
            </tr>
          </thead>
          <tbody className="rounded-[4px] shadow-[0_1px_3px_1px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.065)]">
            {config.properties.map((prop, index) => {
              if (prop.hidden && prop.hidden(state)) return null;
              return (
                <tr
                  key={prop.name}
                  className={`bg-[var(--surface-primary)] border-t border-[var(--border-primary)] ${index === 0 ? "first:border-t-0" : ""}`}
                >
                <td className="py-2.5 px-5">
                  <span className="font-mono text-[var(--text-primary)]">
                    {prop.name}
                  </span>
                </td>
                <td className="py-2.5 px-3.5">
                  <div className="text-[var(--text-secondary)]">
                    {prop.description}
                  </div>
                  <div className="mt-1">
                    <code className="text-xs text-[var(--text-brand-primary)] bg-[var(--bg-brand-subtle)] px-1.5 py-0.5 rounded font-mono">
                      {prop.type}
                    </code>
                  </div>
                </td>
                <td className="py-2.5 px-3.5">
                  {prop.defaultValue ? (
                    <code className="text-xs font-mono text-[var(--text-secondary)]">
                      {prop.defaultValue}
                    </code>
                  ) : (
                    <span className="text-[var(--text-secondary)]">-</span>
                  )}
                </td>
                <td className="py-2.5 px-5">
                  {prop.controlType === "select" &&
                    prop.options && (
                      <div className="relative">
                        <select
                          value={
                            prop.getValue
                              ? prop.getValue(state)
                              : (state as any)[prop.name]
                          }
                          onChange={(e) => {
                            if (prop.setValue) {
                              prop.setValue(
                                state,
                                e.target.value,
                              );
                              setState({ ...state });
                            } else {
                              updateState(
                                prop.name,
                                e.target.value,
                              );
                            }
                          }}
                          className="w-full px-2.5 py-1.5 pr-8 border border-[var(--border-primary)] rounded text-[13px] appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--bg-accent-primary)] focus:border-transparent bg-[var(--surface-primary)]"
                        >
                          {prop.options.map((opt) => {
                            const label =
                              typeof opt === "string"
                                ? opt
                                : opt.label;
                            const value =
                              typeof opt === "string"
                                ? opt
                                : opt.value;
                            return (
                              <option
                                key={value}
                                value={value}
                              >
                                {label}
                              </option>
                            );
                          })}
                        </select>
                        <svg
                          className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-tertiary)]"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M3.854 4.896a.5.5 0 10-.708.708l3.5 3.5a.5.5 0 00.708 0l3.5-3.5a.5.5 0 00-.708-.708L7 8.043 3.854 4.896z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    )}
                  {prop.controlType === "toggle" && (
                    <button
                      onClick={() => {
                        const currentValue = prop.getValue
                          ? prop.getValue(state)
                          : (state as any)[prop.name];
                        if (prop.setValue) {
                          prop.setValue(state, !currentValue);
                          setState({ ...state });
                        } else {
                          updateState(
                            prop.name,
                            !currentValue,
                          );
                        }
                      }}
                      className="px-4 py-1.5 bg-[var(--surface-secondary)] hover:bg-[var(--surface-secondary-hover)] border border-[var(--border-primary)] rounded text-[13px] font-medium transition-colors"
                    >
                      {(
                        prop.getValue
                          ? prop.getValue(state)
                          : (state as any)[prop.name]
                      )
                        ? "true"
                        : "false"}
                    </button>
                  )}
                  {(prop.controlType === "input" || prop.controlType === "text") && (
                    <input
                      type="text"
                      value={
                        prop.getValue
                          ? prop.getValue(state)
                          : (state as any)[prop.name]
                      }
                      onChange={(e) => {
                        if (prop.setValue) {
                          prop.setValue(
                            state,
                            e.target.value,
                          );
                          setState({ ...state });
                        } else {
                          updateState(
                            prop.name,
                            e.target.value,
                          );
                        }
                      }}
                      placeholder="Edit string..."
                      className="w-full px-2.5 py-1.5 border border-[var(--border-primary)] rounded text-[13px] focus:outline-none focus:ring-2 focus:ring-[var(--bg-accent-primary)] focus:border-transparent bg-[var(--surface-primary)]"
                    />
                  )}
                  {prop.controlType === "number" && (
                    <input
                      type="number"
                      value={
                        prop.getValue
                          ? prop.getValue(state)
                          : (state as any)[prop.name]
                      }
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        if (prop.setValue) {
                          prop.setValue(
                            state,
                            isNaN(val) ? 0 : val,
                          );
                          setState({ ...state });
                        } else {
                          updateState(
                            prop.name,
                            isNaN(val) ? 0 : val,
                          );
                        }
                      }}
                      className="w-full px-2.5 py-1.5 border border-[var(--border-primary)] rounded text-[13px] focus:outline-none focus:ring-2 focus:ring-[var(--bg-accent-primary)] focus:border-transparent bg-[var(--surface-primary)]"
                    />
                  )}
                  {prop.controlType === "textarea" && (
                    <textarea
                      value={
                        prop.getValue
                          ? prop.getValue(state)
                          : (state as any)[prop.name]
                      }
                      onChange={(e) => {
                        if (prop.setValue) {
                          prop.setValue(
                            state,
                            e.target.value,
                          );
                          setState({ ...state });
                        } else {
                          updateState(
                            prop.name,
                            e.target.value,
                          );
                        }
                      }}
                      rows={3}
                      className="w-full px-2.5 py-1.5 border border-[var(--border-primary)] rounded text-[13px] focus:outline-none focus:ring-2 focus:ring-[var(--bg-accent-primary)] focus:border-transparent resize-y bg-[var(--surface-primary)]"
                    />
                  )}
                  {prop.controlType === "none" && (
                    <span className="text-[var(--text-secondary)] text-xs">
                      -
                    </span>
                  )}
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Design Guidelines - Compact */}
      {config.designGuidelines && (
        <div className="max-w-[900px] mx-auto mt-12 pt-8 border-t border-[var(--border-secondary)]">
          <h2 className="text-[18px] font-semibold mb-4 text-[var(--text-primary)]">
            Design Guidelines
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Do's */}
            {config.designGuidelines.dos && (
              <div className="p-4 bg-[var(--bg-success-subtle)] border border-[var(--border-success)] rounded-lg">
                <h3 className="text-[14px] font-semibold mb-2 text-[var(--text-primary)] flex items-center gap-2">
                  <span className="text-[var(--text-success)]">✓</span> Do
                </h3>
                <ul className="text-[13px] text-[var(--text-secondary)] space-y-1">
                  {config.designGuidelines.dos.map(
                    (item, i) => (
                      <li
                        key={i}
                        dangerouslySetInnerHTML={{
                          __html: item,
                          
                        }}
                      />
                    ),
                  )}
                </ul>
              </div>
            )}

            {/* Don'ts */}
            {config.designGuidelines.donts && (
              <div className="p-4 bg-[var(--bg-error-subtle)] border border-[var(--border-error)] rounded-lg">
                <h3 className="text-[14px] font-semibold mb-2 text-[var(--text-primary)] flex items-center gap-2">
                  <span className="text-[var(--text-error)]">✕</span>{" "}
                  Don't
                </h3>
                <ul className="text-[13px] text-[var(--text-secondary)] space-y-1">
                  {config.designGuidelines.donts.map(
                    (item, i) => (
                      <li
                        key={i}
                        dangerouslySetInnerHTML={{
                          __html: item,
                        }}
                      />
                    ),
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Header */}
      <div
        className="px-6 py-6"
        style={{
          borderBottom: "1px solid var(--border-primary)",
          backgroundColor: "var(--surface-elevated)",
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1
              className="text-[32px] mb-3"
              style={{
                fontWeight: "bold",
                color: "var(--text-primary)",
              }}
            >
              {config.name}
            </h1>
            <p
              className="text-[16px] leading-[1.6] max-w-4xl"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              {config.description}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6">
        {tokenConfig ? (
          <Tabs defaultValue="component" className="w-full">
            <div className="border-b border-b-[var(--border-primary)] mb-[16px] mt-[20px]">
              <TabsList className="bg-transparent p-0 h-auto gap-6 rounded-none">
                <TabsTrigger 
                  value="component"
                  className={TAB_TRIGGER_CLASS}
                >
                  Componente
                </TabsTrigger>
                <TabsTrigger 
                  value="tokens"
                  className={TAB_TRIGGER_CLASS}
                >
                  Tokens & Anatomia
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="component" className="mt-0">
              {renderComponentTab()}
            </TabsContent>
            
            <TabsContent value="tokens" className="mt-0">
              <ThemeScopeProvider theme={theme}>
                <div className={theme === 'dark' ? 'dark' : ''} data-theme={theme}>
                  <ComponentTokenContent {...tokenConfig} />
                </div>
              </ThemeScopeProvider>
            </TabsContent>
          </Tabs>
        ) : (
          // Fallback for simple usage (no tokens config)
          renderComponentTab()
        )}
      </div>
    </div>
  );
}
