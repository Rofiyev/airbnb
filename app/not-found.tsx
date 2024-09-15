import EmptyState from "@/components/empty-state";

export const dynamic = "force-static"; // 'auto' | 'force-dynamic' | 'error' | 'force-static';

export default function NotFound() {
  return <EmptyState showReset />;
}
