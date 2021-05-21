using NUnit.Framework;
using SWQ_Project.Models;
using SWQ_Project.Services;

namespace SWQ_Project_Test
{
    public class LastnameTests
    {
        private ContactSplitter ContactSplitter { get; set; }
        [SetUp]
        public void Setup()
        {
            ContactSplitter = new ContactSplitter();
        }

        [Test]
        public void Test01()
        {
            string name = "Frau Sandra Berger";
            var contact = ContactSplitter.Split(new CompleteContactModel(name));
            Assert.True(contact.Lastname == "Berger");

        }

        [Test]
        public void Test02()
        {
            string name = "Herr Dr. Sandro Gutmensch";
            var contact = ContactSplitter.Split(new CompleteContactModel(name));
            Assert.True(contact.Lastname == "Gutmensch");
        }

        [Test]
        public void Test03()
        {
            string name = "Professor Heinreich Freiherr vom Wald";
            var contact = ContactSplitter.Split(new CompleteContactModel(name));
            Assert.True(contact.Lastname == "Freiherr vom Wald"); //???
        }

        [Test]
        public void Test04()
        {
            string name = "Mrs. Doreen Faber";
            var contact = ContactSplitter.Split(new CompleteContactModel(name));
            Assert.True(contact.Lastname == "Faber");
        }

        [Test]
        public void Test05()
        {
            string name = "Mme. Charlotte Noir";
            var contact = ContactSplitter.Split(new CompleteContactModel(name));
            Assert.True(contact.Lastname == "Noir");
        }


        [Test]
        public void Test06()
        {
            string name = "Estobar y Gonzales"; //Was passiert mit dem "y"?
            var contact = ContactSplitter.Split(new CompleteContactModel(name));
            Assert.True(contact.Lastname == "y Gonzales");
        }


        [Test]
        public void Test07()
        {
            string name = "Frau Prof. Dr. rer. nat. Maria von Leuthäuser-Schnarrenberger";
            var contact = ContactSplitter.Split(new CompleteContactModel(name));
            Assert.True(contact.Lastname == "von Leuthäuser-Schnarrenberger");
        }


        [Test]
        public void Test08()
        {
            string name = "Herr Dipl. Ing. Max von Müller";
            var contact = ContactSplitter.Split(new CompleteContactModel(name));
            Assert.True(contact.Lastname == "von Müller");
        }


        [Test]
        public void Test09()
        {
            string name = "Dr. Russwurm, Winfried";
            var contact = ContactSplitter.Split(new CompleteContactModel(name));
            Assert.True(contact.Lastname == "Winfried");
        }


        [Test]
        public void Test10()
        {
            string name = "Herr Dr.-Ing. Dr. rer. nat. Dr. h.c. mult. Paul Steffens";
            var contact = ContactSplitter.Split(new CompleteContactModel(name));
            Assert.True(contact.Lastname == "Steffens");
        }
    }
}