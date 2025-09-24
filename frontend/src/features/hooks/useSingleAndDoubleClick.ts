import { useCallback, useEffect, useRef } from "react";

type MouseHandler = () => void;

interface Options {
	delay?: number;
	stopPropagation?: boolean;
	preventDefault?: boolean;
}

export function useSingleAndDoubleClick(
	onClick: MouseHandler,
	onDoubleClick: MouseHandler,
	{ delay = 250, stopPropagation = true, preventDefault = true }: Options = {}
) {
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handler = useCallback(
		(e: React.MouseEvent) => {
			if (stopPropagation) e.stopPropagation();
			if (preventDefault) e.preventDefault();

			if (timer.current) {
				clearTimeout(timer.current);
				timer.current = null;
				onDoubleClick();
			} else {
				timer.current = setTimeout(() => {
					onClick();
					timer.current = null;
				}, delay);
			}
		},
		[delay, onClick, onDoubleClick, preventDefault, stopPropagation]
	);

	useEffect(() => {
		return () => {
			if (timer.current) clearTimeout(timer.current);
		};
	}, []);

	return handler;
}
