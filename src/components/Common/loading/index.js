/**
 * Loading Components Index
 * Central export point for all loading-related components
 *
 * Usage examples:
 *
 * // Page loading (full screen)
 * import { PageLoading } from '@/components/Common/Loading';
 * <PageLoading />
 *
 * // Section loading
 * import { SectionLoading } from '@/components/Common/Loading';
 * <SectionLoading text="Loading data" />
 *
 * // Inline loading (for buttons)
 * import { InlineLoading } from '@/components/Common/Loading';
 * <button><InlineLoading /> Submit</button>
 *
 * // Overlay loading (for cards/containers)
 * import { OverlayLoading } from '@/components/Common/Loading';
 * <div className="relative">
 *   <OverlayLoading />
 *   <CardContent />
 * </div>
 *
 * // Skeleton loaders
 * import { CardSkeleton, TextSkeleton, ImageSkeleton } from '@/components/Common/Loading';
 * <CardSkeleton count={3} />
 * <TextSkeleton lines={4} />
 * <ImageSkeleton aspectRatio="16/9" />
 *
 * // Button loading state
 * import { ButtonLoading } from '@/components/Common/Loading';
 * <button disabled><ButtonLoading text="Submitting" /></button>
 *
 * // Custom loading with all options
 * import Loading from '@/components/Common/Loading';
 * <Loading
 *   variant="section"
 *   size="lg"
 *   text="Custom text"
 *   showText={true}
 *   showIcon={true}
 *   icon="fa-duotone fa-spinner"
 * />
 */

export {
  default,
  PageLoading,
  SectionLoading,
  InlineLoading,
  OverlayLoading,
  CardSkeleton,
  TextSkeleton,
  ImageSkeleton,
  ButtonLoading,
} from '../Loading';
