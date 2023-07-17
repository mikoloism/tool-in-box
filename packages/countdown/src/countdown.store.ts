import { createZustandStore, type Setter } from "@wonize/common/store";
import {
	COUNTDOWN_DEFAULT_DURATION,
	COUNTDOWN_DEFAULT_STATE,
	COUNTDOWN_STORAGE_KEY,
} from "./countdown.constants";
import type {
	CountDownAction,
	CountDownState,
	CountDownStore,
} from "./countdown.interface";
import { assign, interval, storage } from "./countdown.utils";
import { formatDuration } from "./format.utils";

const countDownStore = createZustandStore<CountDownStore>(initailizer);

function initailizer(set: Setter<CountDownState>) {
	let startTime = COUNTDOWN_DEFAULT_DURATION;
	const jsonInitial = storage.getJson<CountDownState>(COUNTDOWN_STORAGE_KEY);
	if (jsonInitial !== null) {
		startTime = jsonInitial.count;
	}

	const state = assign<CountDownState>(COUNTDOWN_DEFAULT_STATE, {
		count: startTime,
	});

	const action: CountDownAction = {
		start() {
			if (interval.isRunning()) return;

			const shouldResetBeforeStart = storage.hasKey(COUNTDOWN_STORAGE_KEY) !== true;
			if (shouldResetBeforeStart) {
				action.reset();
			}

			interval.execute(() => set(loop));
			function loop(store: CountDownState) {
				let count: number = store.count;
				const jsonData = storage.getJson<CountDownState>(COUNTDOWN_STORAGE_KEY);
				if (jsonData !== null) {
					count = jsonData.count <= 1 ? count : jsonData.count;
				}

				const shouldStop: boolean = count - 1 <= 0;
				if (shouldStop) {
					const state = assign<CountDownState>(COUNTDOWN_DEFAULT_STATE, {
						isCounted: true,
					});
					action.stop();
					storage.setJson(COUNTDOWN_STORAGE_KEY, state);
					return state;
				} else {
					count = count - 1;
					const formatted = formatDuration(count);
					const state = assign<CountDownState>(formatted, {
						isCounted: false,
						count,
					});
					storage.setJson(COUNTDOWN_STORAGE_KEY, state);
					return state;
				}
			}
		},

		stop() {
			storage.removeKey(COUNTDOWN_STORAGE_KEY);
			interval.clear();
		},

		reset() {
			const count = COUNTDOWN_DEFAULT_DURATION;
			const formatted = formatDuration(count);
			const state = assign<CountDownState>(formatted, {
				isCounted: false,
				count,
			});
			storage.setJson(COUNTDOWN_STORAGE_KEY, state);
			set(() => state);
		},
	};

	const store = assign<CountDownStore>(state, action);
	return store;
}

export {
	countDownStore,
	countDownStore as useCountDown,
	countDownStore as useCountDownStore,
};
