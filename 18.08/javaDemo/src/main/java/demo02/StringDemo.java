package demo02;

import java.util.Arrays;

public class StringDemo {
    public void testStringFun3() {
        char a = '0', b = '1', c;
        c = (char)(a + b);
        System.out.println(c);
    }
    public void testStringFun2() {
        String str = "学习 JAVA 编程";
        System.out.println("转换为小写：" + str.toLowerCase());
        System.out.println("获取索引为1位置的字符：" + str.charAt(1));
        byte[] b = str.getBytes();
        System.out.println("转换为字节数组：");
        for(int i = 0; i< b.length; i++) {
            System.out.print(b[i] + " ");
        }
        System.out.println();
        String str2 = new String("学习 JAVA 编程");
        System.out.println("str和str2的内存地址相同？" + (str == str2));
        System.out.println("str和str2的内容相同？" + (str.equals(str2)));
    }
    public void testStringFun1() {
        String str = "学习 JAVA 编程";
        System.out.println("字符串的长度：" + str.length());
        char c = '编';
        System.out.println("字符'编'的位置：" + str.indexOf(c));
        System.out.println("子字符串'JAVA'的位置：" + str.indexOf("JAVA"));
        System.out.println("子字符串'imooc'的位置：" + str.indexOf("imooc"));
        String[] arr = str.split(" ");
        System.out.print("按空格分成数组：" + Arrays.toString(arr));
        System.out.println();
        System.out.println("获取位置[3,7)之间的子串：" + str.substring(3, 7));
    }
    public void testString() {
        String s1 = "hello";
        String s2 = "hello";
        String s3 = new String("hello");
        String s4 = new String("hello");
        String s5 = new String("hello").intern();
        String s6 = s1 + "world";
        String s7 = s1 + "world";
        System.out.println("s1==s2：" + (s1 == s2));
        System.out.println("s3==s4：" + (s3 == s4));
        System.out.println("s1==s3：" + (s1 == s3));
        System.out.println("s1==s5：" + (s1 == s5));
        System.out.println("s6==s7：" + (s6 == s7));
    }
    public static void main(String[] args) {
        System.out.println(System.getProperty("file.encoding"));
        StringDemo sd = new StringDemo();
        //sd.testString();
//         sd.testStringFun1();
        sd.testStringFun2();
//        sd.testStringFun3();
    }
}
