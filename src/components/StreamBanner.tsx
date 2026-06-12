import type { StreamSnapshot } from "../api/stream";
import { useI18n, type MessageKey } from "../app/i18n";
import { Icon, type IconName } from "./Icon";
import { EmptyState } from "./ui";

export function StreamBanner(props: { snapshot: StreamSnapshot<unknown>; subject: MessageKey }) {
  const { t } = useI18n();
  if (props.snapshot.phase !== "error") {
    return null;
  }
  return (
    <div className="banner error">
      <Icon name="warning_amber" />
      <div>
        {t("Failed to subscribe to {subject}: {error}", {
          subject: t(props.subject),
          error: props.snapshot.error ?? "",
        })}
        <div className="hint">{t("Check the server address and secret in Settings.")}</div>
      </div>
    </div>
  );
}

// The scaffolding every stream-backed list view repeats: the error banner,
// a "Loading..." placeholder until the first delivery, and an empty state
// once the stream has delivered but the view has nothing to show.
export function StreamStates(props: {
  snapshot: StreamSnapshot<unknown>;
  subject: MessageKey;
  loaded: boolean;
  empty: boolean;
  emptyIcon?: IconName;
  emptyMessage: string;
}) {
  const { t } = useI18n();
  return (
    <>
      <StreamBanner snapshot={props.snapshot} subject={props.subject} />
      {!props.loaded && props.snapshot.phase !== "error" && (
        <EmptyState>{t("Loading...")}</EmptyState>
      )}
      {props.loaded && props.empty && (
        <EmptyState icon={props.emptyIcon}>{props.emptyMessage}</EmptyState>
      )}
    </>
  );
}
