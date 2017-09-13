using RetroChatRestApi.Models.Members;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace RetroChatRestApi.Util
{
    public class CoolUtil
    {
        public static string GetBase64ImageFromDisk(string filePath)
        {
            // TODO: try catch
            string image = "data:image/png;base64,";
            image += Convert.ToBase64String(File.ReadAllBytes(filePath));
            return image;
        }

        public static string WritePostToDisk(AddPost model)
        {
            string folderName = Environment.CurrentDirectory;

            // To create a string that specifies the path to a subfolder under your 
            // top-level folder, add a name for the subfolder to folderName.
            string pathString = Path.Combine(folderName, "Data");
            // You can extend the depth of your path if you want to.
            //pathString = System.IO.Path.Combine(pathString, "SubSubFolder");
            pathString = Path.Combine(pathString, Convert.ToString(model.Id));
            // Create the subfolder. 
            Directory.CreateDirectory(pathString);

            // Create a file name for the file you want to create. 
            string fileName = Path.GetRandomFileName();
            // Use Combine again to add the file name to the path.
            pathString = Path.Combine(pathString, fileName);

            string[] split = model.Image.Split(new char[] { ',' }, 2);

            byte[] bytesImage = Convert.FromBase64String(split[1]);
            File.WriteAllBytes(pathString, bytesImage);

            return pathString;

        }
    }
}
