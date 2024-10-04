import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { PlusCircleIcon } from "lucide-react";

interface Props {}

const DashboardPage: React.FC<Props> = () => {
  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="text-white bg-gradient-to-r from-purple-500 from-10% via-purple-600 via-20% to-purple-900 to-90%">
            <CardHeader className="pb-4">
              <CardTitle>Total Loans</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
          <Card className="text-white bg-gradient-to-r from-orange-500 from-10% via-orange-600 via-20% to-red-700 to-90%">
            <CardHeader className="pb-4">
              <CardTitle>Total Users</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"></div>
            </CardContent>
          </Card>
          <Card className="text-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
            <CardHeader className="pb-4">
              <CardTitle>Video Performance</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500 dark:text-gray-400"></div>
            </CardContent>
          </Card>
          <Card className="border-dashed border-2 bg-transparent">
            <CardHeader className="pb-4 cursor-pointer flex">
              <PlusCircleIcon className="" />
              <span>Add New Card</span>
            </CardHeader>
            <CardContent className="text-sm text-gray-500 dark:text-gray-400"></CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Publish New Video</CardTitle>
              <CardDescription>
                Create and publish a new video to your channel.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <Input placeholder="Video Title" />
                <Textarea placeholder="Video Description" rows={3} />
                <div className="flex gap-2">
                  <Button variant="outline">Upload Thumbnail</Button>
                  <Button>Publish Video</Button>
                </div>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Top Performing Videos</CardTitle>
              <CardDescription>
                A list of your most popular videos by views.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Video</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Likes</TableHead>
                    <TableHead>Comments</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          alt="Video thumbnail"
                          className="aspect-video rounded-md object-cover"
                          height="36"
                          src="/placeholder.svg"
                          width="64"
                        />
                        <div>
                          <div className="font-medium">
                            How to Grow Your YouTube Channel
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            10 min
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>250K</TableCell>
                    <TableCell>12K</TableCell>
                    <TableCell>1.5K</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          alt="Video thumbnail"
                          className="aspect-video rounded-md object-cover"
                          height="36"
                          src="/placeholder.svg"
                          width="64"
                        />
                        <div>
                          <div className="font-medium">
                            The Best Camera Gear for Vlogging
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            15 min
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>180K</TableCell>
                    <TableCell>8K</TableCell>
                    <TableCell>900</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          alt="Video thumbnail"
                          className="aspect-video rounded-md object-cover"
                          height="36"
                          src="/placeholder.svg"
                          width="64"
                        />
                        <div>
                          <div className="font-medium">
                            5 Tips for Better YouTube Thumbnails
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            8 min
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>120K</TableCell>
                    <TableCell>6K</TableCell>
                    <TableCell>700</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Upcoming Playlists</CardTitle>
              <CardDescription>
                A list of playlists you&rsquo;re planning to create.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Playlist</TableHead>
                    <TableHead>Videos</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">YouTube Basics</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Beginner&rsquo;s guide to YouTube
                      </div>
                    </TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>
                      <Badge
                        className="rounded-full px-2 py-1"
                        variant="outline"
                      >
                        Planned
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Advanced Editing</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Tips and tricks for video editing
                      </div>
                    </TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>
                      <Badge
                        className="rounded-full px-2 py-1"
                        variant="outline"
                      >
                        Planned
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">YouTube Growth Hacks</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Strategies to grow your channel
                      </div>
                    </TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>
                      <Badge
                        className="rounded-full px-2 py-1"
                        variant="outline"
                      >
                        Planned
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
