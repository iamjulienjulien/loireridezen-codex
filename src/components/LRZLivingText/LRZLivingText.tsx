import LRZAtmosphericText from "./atmospheric/LRZAtmosphericText";
import LRZBreathingText from "./breathing/LRZBreathingText";
import LRZCutoutText from "./cutout/LRZCutoutText";
import LRZPathText from "./path/LRZPathText";
import LRZScrambleText from "./scramble/LRZScrambleText";
import LRZScrollStory from "./scroll-story/LRZScrollStory";
import LRZTypewriter from "./typewriter/LRZTypewriter";

/**
 * Famille de textes animés et expressifs du Codex.
 *
 * @example
 * <LRZLivingText.BreathingText preset="heading-2">La Loire respire</LRZLivingText.BreathingText>
 */
const LRZLivingText = {
    AtmosphericText: LRZAtmosphericText,
    BreathingText: LRZBreathingText,
    CutoutText: LRZCutoutText,
    PathText: LRZPathText,
    ScrambleText: LRZScrambleText,
    ScrollStory: LRZScrollStory,
    Typewriter: LRZTypewriter,
} as const;

export default LRZLivingText;
export { LRZLivingText };
