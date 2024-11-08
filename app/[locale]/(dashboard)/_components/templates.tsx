'use client';

import { PanelsLeftBottom } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';


export const Templates = () => {
  const t = useTranslations('Dashboard');

  return (
    <Dialog>
      <DialogTrigger className='flex items-center gap-1 text-md'>
        <PanelsLeftBottom className='w-5 h-5' />
        <span>
          {t('templates.openDialogBtnLabel')}
        </span>
      </DialogTrigger>
      <DialogContent className='max-h-[calc(100%-100px)]'>
        <div className='flex max-h-[700px] overflow-hidden'>
          <div className='w-[180px] flex flex-col items-start'>
            <Button variant='ghost'>
              {t('templates.dialogMenuItem1')}
            </Button>
            <Button variant='ghost'>
              {t('templates.dialogMenuItem2')}
            </Button>
            <Button variant='ghost'>
              {t('templates.dialogMenuItem3')}
            </Button>
          </div>
          <div className='w-full max-h-full flex-1 overflow-y-auto'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque distinctio, ipsa laborum qui totam, ut explicabo laboriosam sequi quisquam officia nisi itaque incidunt corrupti. Rem eaque unde animi porro est repellat! Non iure corrupti magni impedit eveniet? Deserunt beatae voluptas consectetur, iure optio non quae atque dolorem similique, repellat fuga distinctio quisquam? Dolor saepe deleniti minus explicabo earum optio nam libero, rem, rerum porro maxime voluptates architecto adipisci numquam consectetur officiis non quam eius incidunt enim quisquam labore? Inventore aliquam consequatur adipisci voluptatem maxime alias fugit natus culpa unde quasi neque totam aliquid consectetur amet, voluptatibus repellat? Voluptatibus beatae veniam, commodi optio eum perferendis eveniet vel, at ab officia incidunt, quae doloremque repudiandae laboriosam quis aperiam! Pariatur dolorum molestiae consequatur voluptas, dolore eius rem voluptatibus cumque deserunt tempora placeat, nulla quos quidem eveniet esse, et blanditiis. Et quam ab delectus odit veritatis quibusdam totam perferendis maiores corporis alias beatae, deserunt porro cupiditate possimus, sint unde aliquam voluptatem non qui? Necessitatibus nulla soluta quibusdam nam, nihil ipsum harum quae quisquam asperiores repudiandae quos assumenda voluptatibus fuga est hic sunt non odit iure id eaque maxime ipsam autem dolore voluptas! Fugiat nesciunt, possimus corrupti porro, id unde dolorem sunt aperiam nam facere reprehenderit consequatur dolorum fuga voluptate? Impedit sit quod ad ut est magni. Quisquam fugiat magnam, sed nihil id neque, cumque architecto et odit, iure repellat ducimus dolore blanditiis nobis? Consequatur rerum nemo dignissimos quibusdam dolor deleniti, iure ratione eligendi porro debitis minima, aut quis quasi repellendus ipsa, cumque voluptatum rem tenetur quo facilis exercitationem necessitatibus quod. Porro nobis hic ab sapiente nam voluptatem expedita magnam dolore sint error natus rerum quibusdam eius repudiandae ad deserunt doloribus, iste voluptates. Voluptate, temporibus perspiciatis? Perferendis corporis, aliquam facere a dicta voluptatum earum est minus accusantium, qui inventore ratione reiciendis dolores placeat suscipit enim!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque distinctio, ipsa laborum qui totam, ut explicabo laboriosam sequi quisquam officia nisi itaque incidunt corrupti. Rem eaque unde animi porro est repellat! Non iure corrupti magni impedit eveniet? Deserunt beatae voluptas consectetur, iure optio non quae atque dolorem similique, repellat fuga distinctio quisquam? Dolor saepe deleniti minus explicabo earum optio nam libero, rem, rerum porro maxime voluptates architecto adipisci numquam consectetur officiis non quam eius incidunt enim quisquam labore? Inventore aliquam consequatur adipisci voluptatem maxime alias fugit natus culpa unde quasi neque totam aliquid consectetur amet, voluptatibus repellat? Voluptatibus beatae veniam, commodi optio eum perferendis eveniet vel, at ab officia incidunt, quae doloremque repudiandae laboriosam quis aperiam! Pariatur dolorum molestiae consequatur voluptas, dolore eius rem voluptatibus cumque deserunt tempora placeat, nulla quos quidem eveniet esse, et blanditiis. Et quam ab delectus odit veritatis quibusdam totam perferendis maiores corporis alias beatae, deserunt porro cupiditate possimus, sint unde aliquam voluptatem non qui? Necessitatibus nulla soluta quibusdam nam, nihil ipsum harum quae quisquam asperiores repudiandae quos assumenda voluptatibus fuga est hic sunt non odit iure id eaque maxime ipsam autem dolore voluptas! Fugiat nesciunt, possimus corrupti porro, id unde dolorem sunt aperiam nam facere reprehenderit consequatur dolorum fuga voluptate? Impedit sit quod ad ut est magni. Quisquam fugiat magnam, sed nihil id neque, cumque architecto et odit, iure repellat ducimus dolore blanditiis nobis? Consequatur rerum nemo dignissimos quibusdam dolor deleniti, iure ratione eligendi porro debitis minima, aut quis quasi repellendus ipsa, cumque voluptatum rem tenetur quo facilis exercitationem necessitatibus quod. Porro nobis hic ab sapiente nam voluptatem expedita magnam dolore sint error natus rerum quibusdam eius repudiandae ad deserunt doloribus, iste voluptates. Voluptate, temporibus perspiciatis? Perferendis corporis, aliquam facere a dicta voluptatum earum est minus accusantium, qui inventore ratione reiciendis dolores placeat suscipit enim!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque distinctio, ipsa laborum qui totam, ut explicabo laboriosam sequi quisquam officia nisi itaque incidunt corrupti. Rem eaque unde animi porro est repellat! Non iure corrupti magni impedit eveniet? Deserunt beatae voluptas consectetur, iure optio non quae atque dolorem similique, repellat fuga distinctio quisquam? Dolor saepe deleniti minus explicabo earum optio nam libero, rem, rerum porro maxime voluptates architecto adipisci numquam consectetur officiis non quam eius incidunt enim quisquam labore? Inventore aliquam consequatur adipisci voluptatem maxime alias fugit natus culpa unde quasi neque totam aliquid consectetur amet, voluptatibus repellat? Voluptatibus beatae veniam, commodi optio eum perferendis eveniet vel, at ab officia incidunt, quae doloremque repudiandae laboriosam quis aperiam! Pariatur dolorum molestiae consequatur voluptas, dolore eius rem voluptatibus cumque deserunt tempora placeat, nulla quos quidem eveniet esse, et blanditiis. Et quam ab delectus odit veritatis quibusdam totam perferendis maiores corporis alias beatae, deserunt porro cupiditate possimus, sint unde aliquam voluptatem non qui? Necessitatibus nulla soluta quibusdam nam, nihil ipsum harum quae quisquam asperiores repudiandae quos assumenda voluptatibus fuga est hic sunt non odit iure id eaque maxime ipsam autem dolore voluptas! Fugiat nesciunt, possimus corrupti porro, id unde dolorem sunt aperiam nam facere reprehenderit consequatur dolorum fuga voluptate? Impedit sit quod ad ut est magni. Quisquam fugiat magnam, sed nihil id neque, cumque architecto et odit, iure repellat ducimus dolore blanditiis nobis? Consequatur rerum nemo dignissimos quibusdam dolor deleniti, iure ratione eligendi porro debitis minima, aut quis quasi repellendus ipsa, cumque voluptatum rem tenetur quo facilis exercitationem necessitatibus quod. Porro nobis hic ab sapiente nam voluptatem expedita magnam dolore sint error natus rerum quibusdam eius repudiandae ad deserunt doloribus, iste voluptates. Voluptate, temporibus perspiciatis? Perferendis corporis, aliquam facere a dicta voluptatum earum est minus accusantium, qui inventore ratione reiciendis dolores placeat suscipit enim!</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};