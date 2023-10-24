export class PublishSubscribeBroker<TTopicsDataMap extends Record<string, any>> {
    private __subscribers: Map<keyof TTopicsDataMap, Set<(data?: TTopicsDataMap[keyof TTopicsDataMap]) => void>> =
        new Map();

    constructor() {}

    subscribe<TTopic extends keyof TTopicsDataMap>(
        topic: TTopic,
        callback: (data: TTopicsDataMap[TTopic]) => void
    ): () => void {
        if (!this.__subscribers.has(topic)) {
            this.__subscribers.set(topic, new Set());
        }

        this.__subscribers.get(topic)?.add(callback as TTopicsDataMap[keyof TTopicsDataMap]);

        return () => {
            this.__subscribers.get(topic)?.delete(callback as TTopicsDataMap[keyof TTopicsDataMap]);
        };
    }

    publish<TTopic extends keyof TTopicsDataMap>(topic: TTopic, data: TTopicsDataMap[TTopic]) {
        this.__subscribers.get(topic)?.forEach((callback) => {
            callback(data);
        });
    }
}
