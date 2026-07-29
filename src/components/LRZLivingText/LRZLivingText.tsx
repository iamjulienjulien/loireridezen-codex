import LRZCutoutText from "@/components/LRZCutoutText";
import {
    LRZAtmosphericText,
    LRZBreathingText,
    LRZPathText,
    LRZScrollStory,
} from "@/components/LRZLivingTypography";
import LRZTypewriter from "@/components/LRZTypewriter";

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
    ScrollStory: LRZScrollStory,
    Typewriter: LRZTypewriter,
} as const;

export default LRZLivingText;
export { LRZLivingText };
