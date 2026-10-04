import { factId } from "../../../src/minigames/multiplication/facts";
import {
  emptyProgress,
  getFactProgress,
  recordAnswer,
  loadProgress,
  saveProgress,
  STORAGE_KEY,
  StorageLike,
} from "../../../src/minigames/multiplication/progress";

const memoryStorage = (initial: Record<string, string> = {}): StorageLike => {
  const data = { ...initial };
  return {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => {
      data[k] = v;
    },
  };
};

const id78 = factId(7, 8);
const id25 = factId(2, 5);

describe("MULT-TEST-003: recording answers", () => {
  it("increments correctCount on a correct answer", () => {
    const p = recordAnswer(emptyProgress(), [id78], true);
    expect(getFactProgress(p, id78)).toMatchObject({
      correctCount: 1,
      incorrectCount: 0,
    });
  });

  it("records a wrong answer without lowering correctCount", () => {
    let p = recordAnswer(emptyProgress(), [id78], true);
    p = recordAnswer(p, [id78], true);
    p = recordAnswer(p, [id78], false);
    expect(getFactProgress(p, id78)).toMatchObject({
      correctCount: 2,
      incorrectCount: 1,
    });
  });

  it("updates every fact of a multi-fact question", () => {
    const p = recordAnswer(emptyProgress(), [id78, id25], true);
    expect(getFactProgress(p, id78).correctCount).toBe(1);
    expect(getFactProgress(p, id25).correctCount).toBe(1);
  });

  it("stamps lastAskedAt with the question counter and advances it", () => {
    const p1 = recordAnswer(emptyProgress(), [id78], true);
    const p2 = recordAnswer(p1, [id25], false);
    expect(getFactProgress(p1, id78).lastAskedAt).toBe(0);
    expect(getFactProgress(p2, id25).lastAskedAt).toBe(1);
    expect(p2.questionCounter).toBe(2);
  });

  it("does not mutate the original progress", () => {
    const original = emptyProgress();
    recordAnswer(original, [id78], true);
    expect(original).toEqual(emptyProgress());
  });

  it("returns zeroed progress for facts never asked", () => {
    expect(getFactProgress(emptyProgress(), id78)).toEqual({
      correctCount: 0,
      incorrectCount: 0,
      lastAskedAt: null,
    });
  });
});

describe("MULT-TEST-004: persistence", () => {
  it("round-trips through storage under the versioned key", () => {
    const storage = memoryStorage();
    const p = recordAnswer(emptyProgress(), [id78], true);
    saveProgress(p, storage);
    expect(storage.getItem(STORAGE_KEY)).not.toBeNull();
    expect(loadProgress(storage)).toEqual(p);
  });

  it("returns empty progress for a missing key", () => {
    expect(loadProgress(memoryStorage())).toEqual(emptyProgress());
  });

  it("returns empty progress for corrupt JSON", () => {
    const storage = memoryStorage({ [STORAGE_KEY]: "{not json" });
    expect(loadProgress(storage)).toEqual(emptyProgress());
  });

  it("returns empty progress for an unknown version", () => {
    const storage = memoryStorage({
      [STORAGE_KEY]: JSON.stringify({ version: 99, questionCounter: 3, facts: {} }),
    });
    expect(loadProgress(storage)).toEqual(emptyProgress());
  });

  it("drops invalid fact entries and keeps valid ones", () => {
    const storage = memoryStorage({
      [STORAGE_KEY]: JSON.stringify({
        version: 1,
        questionCounter: 5,
        facts: {
          [id78]: { correctCount: 3, incorrectCount: 1, lastAskedAt: 4 },
          [id25]: { correctCount: -1, incorrectCount: 0, lastAskedAt: null },
          "99x99": { correctCount: 1, incorrectCount: 0, lastAskedAt: null },
          [factId(3, 4)]: { correctCount: "lots", incorrectCount: 0 },
        },
      }),
    });
    const p = loadProgress(storage);
    expect(p.questionCounter).toBe(5);
    expect(Object.keys(p.facts)).toEqual([id78]);
    expect(getFactProgress(p, id78).correctCount).toBe(3);
  });

  it("survives a storage that throws", () => {
    const broken: StorageLike = {
      getItem: () => {
        throw new Error("denied");
      },
      setItem: () => {
        throw new Error("quota");
      },
    };
    expect(loadProgress(broken)).toEqual(emptyProgress());
    expect(() => saveProgress(emptyProgress(), broken)).not.toThrow();
  });
});
