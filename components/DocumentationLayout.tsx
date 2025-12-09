import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import exaLogo from 'figma:asset/72ee57109aceba2500c22b674f9fe8226c16775e.png';
import { useTheme } from '../exa-design-system/contexts/ThemeContext';
import { navigationConfig, NavItem } from '../pages/docs/configs/navigationConfig';

interface DocumentationLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  onNavigate?: (pageId: string) => void;
}

export const DocumentationLayout: React.FC<DocumentationLayoutProps> = ({
  children,
  currentPage,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { darkMode } = useTheme();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    foundation: true,
    tokens: true,
    components: true,
    organisms: true,
    'assets': false,
    'button-group': false,
    'dropdown-group': false,
    'input-group': false,
    'alert-group': false,
  });

  // Helper to check if an item or its children match the search query
  const matchesSearch = (item: NavItem, query: string): boolean => {
    const term = query.toLowerCase();
    const matchesLabel = item.label.toLowerCase().includes(term);
    const hasMatchingChildren = item.children?.some(child => matchesSearch(child, query));
    return matchesLabel || !!hasMatchingChildren;
  };

  // Helper to filter items based on search
  const filterItems = (items: NavItem[], query: string): NavItem[] => {
    return items
      .map(item => {
        // If the item itself matches, we include it.
        // If it has children, we need to filter them too if the parent didn't strictly match by label
        // but we want to show the context. Actually, a better approach is:
        // Include item if it matches OR any of its children match.
        // If including, also filter its children to only show matching ones (unless the parent itself matched strictly? 
        // usually users want to see only matching children).
        
        // Let's go with: Include item if matchesSearch(item).
        // For children property, recursively filter.
        
        if (!matchesSearch(item, query)) return null;
        
        const newItem = { ...item };
        if (newItem.children) {
          newItem.children = filterItems(newItem.children, query);
        }
        return newItem;
      })
      .filter((item): item is NavItem => item !== null);
  };

  const filteredNavigation = useMemo(() => {
    if (!searchQuery.trim()) return navigationConfig;

    return navigationConfig
      .map(section => ({
        ...section,
        items: filterItems(section.items, searchQuery.trim())
      }))
      .filter(section => section.items.length > 0);
  }, [searchQuery]);

  // Auto-expand sections when searching
  useEffect(() => {
    if (searchQuery.trim()) {
      const newExpandedState = { ...expandedSections };
      
      filteredNavigation.forEach(section => {
        newExpandedState[section.id] = true; // Expand main sections
        
        // Recursively expand items with children that are in the filtered list
        const expandItems = (items: NavItem[]) => {
          items.forEach(item => {
            if (item.children && item.children.length > 0) {
              newExpandedState[item.id] = true;
              expandItems(item.children);
            }
          });
        };
        
        expandItems(section.items);
      });
      
      setExpandedSections(newExpandedState);
    }
  }, [searchQuery, filteredNavigation]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections[item.id];
    const isActive = currentPage === item.id;

    // Highlight search match
    const renderLabel = () => {
      if (!searchQuery) return item.label;
      
      const parts = item.label.split(new RegExp(`(${searchQuery})`, 'gi'));
      return (
        <span>
          {parts.map((part, i) => 
            part.toLowerCase() === searchQuery.toLowerCase() ? (
              <span key={i} className={darkMode ? "bg-blue-900 text-blue-200" : "bg-yellow-100 text-gray-900"}>
                {part}
              </span>
            ) : (
              part
            )
          )}
        </span>
      );
    };

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleSection(item.id);
            } else {
              onNavigate?.(item.id);
            }
          }}
          className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
            isActive 
              ? darkMode 
                ? 'bg-blue-900 text-blue-300 font-medium' 
                : 'bg-blue-50 text-blue-600 font-medium'
              : darkMode 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-700 hover:bg-gray-50'
          }`}
          style={{ paddingLeft: `${12 + level * 16}px` }}
        >
          {hasChildren && (
            isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          )}
          {!hasChildren && <span className="w-3.5" />}
          <span className="flex-1 text-left truncate">{renderLabel()}</span>
        </button>
        {hasChildren && isExpanded && (
          <div>
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Sidebar */}
      <aside className={`w-64 border-r flex flex-col ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
        {/* Logo */}
        <div className={`p-4 border-b flex items-center justify-between ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-2">
            <img src={exaLogo} alt="EXA Logo" className="h-6 w-auto object-contain" />
          </div>
        </div>

        {/* Search */}
        <div className={`p-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} size={16} />
            <input
              type="text"
              placeholder="Find components"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto no-scrollbar">
          {filteredNavigation.map(section => (
            <div key={section.id} className="py-3">
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {expandedSections[section.id] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                {section.title}
              </button>
              {expandedSections[section.id] && (
                <div className="mt-1">
                  {section.items.map(item => renderNavItem(item))}
                </div>
              )}
            </div>
          ))}
          {filteredNavigation.length === 0 && (
            <div className={`p-4 text-center text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              No components found
            </div>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        {children}
      </main>
    </div>
  );
};
