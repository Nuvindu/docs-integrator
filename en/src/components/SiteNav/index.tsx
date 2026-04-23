import { useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocSidebarDesktop from '@theme/DocSidebar/Desktop';
import type { PropSidebarItem, PropSidebarItemCategory } from '@docusaurus/plugin-content-docs';
import { usePluginData } from '@docusaurus/useGlobalData';
import { AnnouncementBarProvider, ScrollControllerProvider } from '@docusaurus/theme-common/internal';

import styles from './styles.module.css';

/**
 * The expose-sidebars plugin (en/src/plugins/expose-sidebars) takes the
 * resolved sidebars from the docs plugin and publishes them as global data
 * so the homepage drawer renders the same tree as the inline doc sidebar.
 * Single source of truth = sidebars.ts.
 */
type ExposedSidebarData = { mainSidebar: PropSidebarItem[] };

/** Force every category to start collapsed in the homepage drawer. */
function forceCollapsed(items: PropSidebarItem[]): PropSidebarItem[] {
  return items.map((item) => {
    if (item.type === 'category') {
      const cat = item as PropSidebarItemCategory;
      return {
        ...cat,
        collapsed: true,
        collapsible: cat.collapsible !== false,
        items: forceCollapsed(cat.items),
      };
    }
    return item;
  });
}

/**
 * Compare against `useBaseUrl('/')` instead of a literal `'/'` so the check
 * works under non-root deployments (e.g. the GitHub Pages preview at
 * `wso2.github.io/docs-integrator/`, where `pathname` is `/docs-integrator/`).
 * Trailing slashes are normalized so `/foo` and `/foo/` both match.
 */
function isHomepage(pathname: string, homeUrl: string): boolean {
  const norm = (p: string) => (p.endsWith('/') ? p : `${p}/`);
  return norm(pathname) === norm(homeUrl);
}

function HamburgerIcon(): ReactNode {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function NavDrawer({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: PropSidebarItem[];
}): ReactNode {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  return (
    <>
      <div
        className={`${styles.drawerOverlay} ${open ? styles.drawerOverlayOpen : ''}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}
        aria-hidden={!open}
        aria-label="Documentation navigation">
        <div className={styles.drawerScroll}>
          <DocSidebarDesktop
            sidebar={items}
            path="/none"
            onCollapse={() => {}}
            isHidden={false}
          />
        </div>
        <div className={styles.drawerFooter}>
          <Link
            href="https://mi.docs.wso2.com"
            className={styles.externalDocLink}
            onClick={onClose}>
            <span className={styles.miDocBadge}>MI</span>
            <span className={styles.miDocText}>
              <span className={styles.miDocTitle}>WSO2 MI Documentation</span>
              <span className={styles.miDocSubtitle}>Micro Integrator docs</span>
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </Link>
          <Link
            href="https://si.docs.wso2.com/latest/"
            className={styles.externalDocLink}
            onClick={onClose}>
            <span className={styles.siDocBadge}>SI</span>
            <span className={styles.miDocText}>
              <span className={styles.miDocTitle}>WSO2 SI Documentation</span>
              <span className={styles.miDocSubtitle}>Streaming Integrator docs</span>
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </Link>
        </div>
      </aside>
    </>
  );
}

/**
 * Track whether the viewport currently matches the desktop breakpoint
 * (matches the `(min-width: 997px)` rule that hides the toggle in CSS).
 * Default to `true` for SSR so the markup matches the desktop layout the
 * server renders. The first client-side effect corrects it.
 */
function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 997px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return isDesktop;
}

export default function SiteNav(): ReactNode {
  const { pathname } = useLocation();
  const homeUrl = useBaseUrl('/');
  const onHome = isHomepage(pathname, homeUrl);
  const isDesktop = useIsDesktop();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Pull the resolved sidebars from the expose-sidebars plugin.
  const data = usePluginData('expose-sidebars') as ExposedSidebarData | undefined;
  const items = useMemo(
    () => forceCollapsed(data?.mainSidebar ?? []),
    [data],
  );

  // Close drawer when route changes or viewport drops below desktop —
  // CSS hides the hamburger on mobile, so don't leave a drawer or its
  // body scroll-lock dangling.
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isDesktop) setDrawerOpen(false);
  }, [isDesktop]);

  // Skip rendering entirely outside the homepage or below the desktop
  // breakpoint — Docusaurus's native menu owns mobile nav.
  if (!onHome || !isDesktop) return null;

  return (
    <>
      <button
        type="button"
        className={styles.navToggle}
        aria-label="Browse documentation"
        aria-expanded={drawerOpen}
        onClick={() => setDrawerOpen((v) => !v)}>
        <HamburgerIcon />
      </button>
      <AnnouncementBarProvider>
        <ScrollControllerProvider>
          <NavDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            items={items}
          />
        </ScrollControllerProvider>
      </AnnouncementBarProvider>
    </>
  );
}
